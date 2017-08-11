import {Input, Component, OnDestroy} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from './http.service';  

@Component({
    selector: 'item-info',
    template: `
               <div class="test">
               	<div class='wrapper'>
                	<div>Channel:{{channel}}</div>
                	 <a href={{href}}>
                		<img src={{videoIMG}}>
                		<span> title{{title}}</span>
                	</a>
                </div>
                </div>
                
                


    `,styles: [
        ` .selected{
        	background-color:green;

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
export class ItemComponent implements OnDestroy { 
    private href:string;
    private id: any;
    private page: any;
    private idvideo: string;
    private videoIMG: string;
    private channel: string;
    private title:string;

    private routeSubscription: Subscription;
    private querySubscription: Subscription;
    constructor(private route: ActivatedRoute;
    	private httpService: HttpService){
        console.log("Component constructor");
        this.routeSubscription = route.params.subscribe((params)=>{
        	console.log("route changed");
        	this.id=params['id'];
        	this.testf();
        	this.getSubs();
    	});
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                         
                
			
            }

        );
       
    }
    testf(){
    	this.idvideo=localStorage.getItem('videoId');
    	this.videoIMG=localStorage.getItem('videoIMG');
    	this.channel=localStorage.getItem('channelTitle');
    	this.title=localStorage.getItem('title');
    	this.href='https://www.youtube.com/watch?v='+this.idvideo;
    	
    }
    ngOnDestroy(){
    	console.log("destroyed");
        this.routeSubscription.unsubscribe();
        this.querySubscription.unsubscribe();
    }
     getSubs(){
    	
    		
    		this.httpService.getSubs(this.idvideo).subscribe((res)=>{
    			/*var captions;
    			var result=res.responseText;
    			var parser=new DOMParser();
    		 captions= parser.parseFromString(res, "text/xml").getElementsByTagName('track');
				console.log("res");
				console.log(res);
				console.log(captions);
				console.log(result);*/
    		});
    	
	}
}