import {Input, Component, OnDestroy,OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from './http.service';  
import { DomSanitizer } from '@angular/platform-browser';
import{} from'./isMobile';
@Component({
    selector: 'item-info',
    template: `
    		
	<iframe width="100%" height="500" [src]="url | safe"></iframe>
              
               
               <div class="subt">
               	<select (change)="download_subtitleEvent($event)">
               	<option *ngFor="let option of options">{{option}}</option>
               	</select>
               </div> 
               <div [innerHTML]="subtitles|safeHtml"></div>
    `,styles: [
        ` .selected{
        	background-color:green;

        }
        .subt{
        	margin-bottom: 10px;
        	display: inline-block;
        	border: 1px solid rgb(0, 183, 90);
        	cursor: pointer; color: rgb(255, 255, 255);
        	border-top-left-radius: 3px;
        	border-top-right-radius: 3px;
        	border-bottom-right-radius: 3px;
        	border-bottom-left-radius: 3px;
        	background-color: #00B75A;
       		margin-left: 4px; 
        }
        .text{
        	text-align:center;
        }
        .test{
        	width: 60%;
        	background-color:#fff;
        	margin: auto;

        }

        `]

})
export class ItemComponent { 
	private options:Array<any>=[];
	private url:string;
	private subtitles:string="";
    private href:string;
    private id: any;
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
        	this.id=params['id'];

        	this.testf();
        	/*this.inject_our_script();*/
        	this.inject_our_script1();
        	/*this.getSubs();*/

    	});
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                         
                
			
            }

        );
       
    }
    ngOnInit(){}

    testf(){

    	this.idvideo=localStorage.getItem('videoId');
    	this.videoIMG=localStorage.getItem('videoIMG');
    	this.channel=localStorage.getItem('channelTitle');
    	this.title=localStorage.getItem('title');
    	this.href='https://www.youtube.com/watch?v='+this.idvideo;
    	this.url='https://www.youtube.com/embed/'+this.idvideo;


    	
    }

    getVideoUrl(idvideo:any){
       return this.sanitizer.bypassSecurityTrustUrl('https://www.youtube.com/embed/'+idvideo);
    }
	download_subtitleEvent(e:Event){
		var select:any;
    	select=e.target;
    	var n:number=select.selectedIndex;
    	this.download_subtitle(n);
		
	}
    download_subtitle(number:number){

    	var caption = this.caption_array[number];
    	var url = 'https://www.youtube.com/api/timedtext?'
     	+ caption.lang_code + '&lang=' + caption.lang_code + 
     	'&name=' + caption.name + '&v=' + this.idvideo;

    	/*fetch(url).then((res)=> res.text())
    			.then(txt => {
    				var parser1=new DOMParser();
    					var  c= parser1.parseFromString(txt, "text/xml");
    					
    					var text=c.getElementsByTagName('text');
    					
    					var result="";
    					for(var i=0; i<text.length; i++){
            var index = i+1;
            var content = text[i].textContent.replace(/\n/g, '');

           
             result=result+" | "+content;
             this.subtitles=result.replace(/&#39;/g, "'")
        }	 this.subtitles=this.subtitles.replace(/&quot;/g, "	&#34;" );
        
    				})
    	*/
    	
    	console.log(caption);

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
    				if (captions.length === 0) {this.options[0] = 'No captions.';return}
 				var caption_info,caption;
 				for (var i = 0, il = captions.length; i < il; i++) {
                caption=captions[i];
                	caption_info = {
                    name:      caption.getAttribute('name'),
                    lang_code: caption.getAttribute('lang_code'),
                    lang_name: caption.getAttribute('lang_translated')
                	};
                this.options.push(caption_info.lang_name);
                this.caption_array.push(caption_info);

    	
            	}
            	console.log(   this.options[0]);
            this.download_subtitle(0);	
    		});
    			

    }
    
    
}
