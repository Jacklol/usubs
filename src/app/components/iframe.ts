import {Input, Component, OnDestroy,OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../http.service';  
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'item-info',
    template: `
            <div  class='iframe' *ngIf='id'>		
	            <iframe width="100%" height="100%" fs=1
                    allowfullscreen controls=2  
                    [src]="url | safe"   > </iframe>
                <div [innerHTML]="subtitles|safeHtml"></div>          
                <div class="subt" >
                   	<select (change)="download_subtitleEvent($event)">
                   	<option *ngFor="let option of options">{{option}}</option>
                   	</select>
                </div> 
            </div> 
    `, styleUrls: ["./css/iframe.css"]

})
export class iframeComponent { 
	private options:Array<any>=[];
	private url:string;
	private subtitles:string="";
    private href:string;
    private id: any;
    private search: string;
    private page: any;
    private idvideo: string;
    private videoIMG: string;
    private channel: string;
    private title:string;
	private caption_array:Array<any>=[];
    private routeSubscription: Subscription;
    private querySubscription: Subscription;
    constructor(private route: ActivatedRoute,
    	private httpService: HttpService,
    	private sanitizer: DomSanitizer){
            this.routeSubscription = route.params.subscribe((params)=>{
    	    });
        this.querySubscription = route.queryParams.subscribe(
            (queryParams: any) => {
          	this.id = queryParams['Id'];
        	this.search= queryParams['search'];	
            this.testf();
        	this.inject_our_script1();
 			}
        );
    }

    testf(){
    	this.idvideo=localStorage.getItem('videoId');
    	this.href='https://www.youtube.com/watch?v='+this.idvideo;
    	this.url='https://www.youtube.com/embed/'+this.id;
    }

    getVideoUrl(idvideo:any){
       return this.sanitizer.bypassSecurityTrustUrl('https://www.youtube.com/embed/'+idvideo);
    }
	download_subtitleEvent(e:Event){
		var select:any;
    	select=e.target;
        
        var index=select.selectedIndex;
    	this.download_subtitle(index);
		
	}
    download_subtitle(number:number){
    	var caption = this.caption_array[number];
    	var url = 'https://www.youtube.com/api/timedtext?'
     	+ caption.lang_code + '&lang=' + caption.lang_code + 
     	'&name=' + caption.name + '&v=' + this.idvideo;
        this.httpService.getFullSubs(url);
    	this.httpService.getFullSubs(url).map((res)=> res.text())
    			.subscribe(txt => {
    				var parser1=new DOMParser();
    				var  c= parser1.parseFromString(txt, "text/xml");
    				var text=c.getElementsByTagName('text');
    				var result="";
    				for(var i=0; i<text.length; i++){
                        var index = i+1;
                        var content = text[i].textContent.replace(/\n/g, '');
                        result=result+content+" | ";
                        this.subtitles=result;
                    }	 
    	})
    }

    inject_our_script1(){
    		this.caption_array=[];
    		this.subtitles="";
    		this.httpService.getSubs(this.idvideo)
    			.map((res)=> res.text())
    			.subscribe(txt => {
    				var parser=new DOMParser();
    				var  captions= parser.parseFromString(txt, "text/xml").getElementsByTagName('track');
                    this.options=[]; 
    				if (captions.length === 0){this.options[0]='No captions.';return}
 				    var caption_info,caption,defaultNumber=0;
 				    for (var i = 0, il = captions.length; i < il; i++) {
                        caption=captions[i];
                        if (caption.getAttribute('lang_default')=="true"){
                        defaultNumber=i;
                    }
                	caption_info = {
                    name:      caption.getAttribute('name'),
                    lang_code: caption.getAttribute('lang_code'),
                    lang_name: caption.getAttribute('lang_translated'),
                	};
                this.options.push(caption_info.lang_name);
                this.caption_array.push(caption_info);
            	}
            this.download_subtitle(defaultNumber);	
    		});
    }
    ngOnDestroy(){
        this.routeSubscription.unsubscribe();
        this.querySubscription.unsubscribe();
    }
}
