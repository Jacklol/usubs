import { Input, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { HttpService } from '../http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { GapiReason, caption_info } from '../interface';
declare var gapi: any;
@Component({
    selector: 'item-info',
    template: `
                <div  class='iframe' *ngIf='id'>		
	                 <iframe width="100%" height="100%" fs=1
                    allowfullscreen controls=2  
                    [src]="url | safe"> </iframe>
                <div class='description'>  {{description}} </div>
                <button id="signin-button" (click)="handleSignInClick()" *ngIf='isSignedIn'>Sign In</button>
                <div class='subtitles' [innerHTML]="subtitles|safeHtml"></div>          
            </div> 
    `, styleUrls: ["./css/iframe.css"]

})
export class iframeComponent {
    private isSignedIn: boolean = false;
    private options: Array<string> = [];
    private url: string;
    private subtitles: string = "";
    private description: string;
    private href: string;
    private id: string;
    private search: string;
    private captionPath: string;
    private caption_array: Array<caption_info> = [];
    private routeSubscription: Subscription;
    private querySubscription: Subscription;
    constructor(private route: ActivatedRoute,
        private httpService: HttpService,
        private sanitizer: DomSanitizer) {
        this.routeSubscription = route.params.subscribe((params) => {
        });
        this.querySubscription = route.queryParams.subscribe(
            (queryParams: { [key: string]: any }) => {
                this.id = queryParams['Id'];
                this.search = queryParams['search'];
                this.getfromLocStor();
            }
        );
    }
    getInfoCaptions() {
        this.httpService.getInfoCaptions(this.id)
            .map((res) => res.json())
            .subscribe(txt => {
                if (txt.items.length == 0) {
                    return
                } else {
                    this.captionPath = txt.items[0].id;
                    this.initgapi()
                }
            });
    }
    initgapi() {
        gapi.load('client:auth2', this.initClient.bind(this));
    }
    initClient() {
        var that = this;
        function updateSigninStatus(isSignedIn: boolean) {
            if (isSignedIn) {
                this.makeApiCall()
                this.isSignedIn = false;
            } else { this.isSignedIn = true; }
        }
        gapi.client.init({
            'apiKey': 'AIzaSyDlcg8UFkX8RHWfmo3aWxckbc1Mq95QfwU',
            'clientId': '2032338954-2th8cmn585duf8bobl0sh9deop3d40gi.apps.googleusercontent.com',
            'scope': 'https://www.googleapis.com/auth/youtube.force-ssl',
        }).then(() => {
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus.bind(this));
            updateSigninStatus.bind(this)(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    }
    makeApiCall() {
        gapi.client.request({
            'path': 'https://www.googleapis.com/youtube/v3/captions/' + this.captionPath,
        }).then((response: GapiReason) => {
            var arr = response.body.split(/\n/);
            var result = "";
            for (var i = 0; i < arr.length; i++) {
                if (i % 3 == 1) {
                    result += arr[i] + " | ";
                }
            }
            this.subtitles = result;
        }, (reason: GapiReason) => {
            this.subtitles = reason.body;
        });
    }
    handleSignInClick() {
        gapi.auth2.getAuthInstance().signIn();
        this.makeApiCall();
    }
    handleSignOutClick() {
        this.makeApiCall();
        gapi.auth2.getAuthInstance().signOut();
    }
    getfromLocStor() {
        this.href = 'https://www.youtube.com/watch?v=' + this.id;
        this.url = 'https://www.youtube.com/embed/' + this.id;
        this.description = localStorage.getItem('description');
        if (this.id !== undefined) {
            this.subScript();
        }
    }
    downloadSubtitleSelect(e: Event) {
        var select = <HTMLSelectElement>e.target;
        var index = select.selectedIndex;
        this.downloadSubtitle(index);
    }
    downloadSubtitle(number: number) {
        var caption = this.caption_array[number];
        var url = 'https://www.youtube.com/api/timedtext?'
            + caption.lang_code + '&lang=' + caption.lang_code +
            '&name=' + caption.name + '&v=' + this.id;
        this.httpService.getCaptionSubs(url).map((res) => res.text())
            .subscribe(txtXml => {
                var parser = new DOMParser();
                var xmlSub = parser.parseFromString(txtXml, "text/xml");
                var text = xmlSub.getElementsByTagName('text');
                var result = "";
                for (var i = 0; i < text.length; i++) {
                    var index = i + 1;
                    var content = text[i].textContent.replace(/\n/g, '');
                    result += content + " | ";
                    this.subtitles = result;
                }
            })
    }
    subScript() {
        this.caption_array = [];
        this.subtitles = "";
        this.httpService.getSubs(this.id)
            .map((res) => res.text())
            .subscribe(txt => {
                var parser = new DOMParser();
                var captions = parser.parseFromString(txt, "text/xml").getElementsByTagName('track');
                this.options = [];
                if (captions.length === 0) {
                    this.options[0] = 'No captions.';
                    this.getInfoCaptions();
                    return
                }
                var caption_info, caption, defaultNumber = 0;
                if (captions.length === 2) {
                    defaultNumber = 1;
                }
                for (var i = 0, il = captions.length; i < il; i++) {
                    caption = captions[i];
                    if (caption.getAttribute('lang_code') == "en") {
                        defaultNumber = i;
                    }
                    if (caption.getAttribute('lang_default') == "true") {
                        defaultNumber = i;
                    }
                    caption_info = {
                        name: caption.getAttribute('name'),
                        lang_code: caption.getAttribute('lang_code'),
                        lang_name: caption.getAttribute('lang_translated'),
                    };
                    this.options.push(caption_info.lang_name);
                    this.caption_array.push(caption_info);
                }
                this.downloadSubtitle(defaultNumber);
            });
    }
    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
        this.querySubscription.unsubscribe();
    }
}
