import {Input, Component, OnDestroy} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'item-info',
    template: `
    			<h3>ID {{id}}</h3>
    			

               <div class="test">
               	<div class='wrapper'>
                	<div>Channel:{{channel}}</div>
                	 <a href={{href}}>
                		<img src={{videoIMG}}>
                		<div class= 'text'> title{{title}}</div>
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
    constructor(private route: ActivatedRoute){
        console.log("Component constructor");
        this.routeSubscription = route.params.subscribe((params)=>{
        	console.log("route changed");
        	this.id=params['id'];
        	this.testf();
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
}