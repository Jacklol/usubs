import { Component,OnInit} from '@angular/core';
import { HttpService} from './http.service';
import { Response} from '@angular/http';
import {VideoSearchBase} from './user';
@Component({
  selector: 'my-app',
  template: `
    selectedPage      {{selectedPage }}
    
  		<div class='center_wrapper'>
  			<div class='center'>
  			  			<nav>
                <a routerLink="">Главная</a>
			</nav>
   			
  			<first [(Title)]="title" (onCheckEnter)="onCheckEnter($event)"
  			(onclickButton)="onclickButton()"></first>
  		    <button *ngIf="!show" (click)="hidden()">{{show ? 'hide' : 'show'}}</button>
  			
  			</div>
  		</div>


  		<div class='content_wrapper'>
  		<div class='content'>
  			<div  *ngIf="show">	
  				<h1>find</h1>
  		  		<h2>{{title}}</h2>
  			<child-comp [video]="video"
  				[MassivOfVideo]="MassivOfVideo"
  			 	(onChanged)="onSelectedVideo($event)">
  			</child-comp>
  		</div>
  		</div>		
	</div>
	
		
  		<div class="middle">
	  	<router-outlet ></router-outlet>	
	  	</div>	
	  	 <footer style="position: absolute; bottom: 0">
    	Конец документа.
  		</footer>
  `, providers: [HttpService],  styles: [

        `
        .body{
        	style="height: 1000px; position: relative
        }
        .content_wrapper{
        	position: relative;
    		background: #f0f0f0; 
    		overflow-y: auto; 
    		overflow-x: hidden;
    		height: 1100px;
    		width: 437px;
        }
        .middle{
        	float:left;
        	margin-left:20px;
        }
        .content{
        	float: left;
        	position: absolute;
        	top: 15px;
        }
        .center_wrapper{
        z-index:1;
     	width: 100%;
    	height: 100%;
    	position: fixed;
    	top: 0;
    	left: 0;
    	display: flex;
    	align-items: center;
    	justify-content: center; 
    	overflow: auto;   
    	}
        .center{
        	
        	
        }
        
        .top{
        	margin: auto;
        	width: 40%;
        	

        	
        }
         .selected{
        	background-color:green;

        }
        .buttons{

        }
        .wrapper{
        margin: auto;
    	width: 75%;
        }
        .test{
        	width:400px;
        	
        	display:inline-block;
        	background-color:#fff223;
        	float:left;
        	height:300px;
        	margin:20px 20px 0 0;

        }
        `]
})
export class AppComponent { 
	name: string = "Tom";
	show: boolean = false;
	nothidden:string='';
	videoid:string='';
	video:any;
	idVidio:string;
	quantity:number;
	title:string="title";
	pages:Array<number>;
	count:number;
	minPage=1;
	maxPage:number;
 	selectedPage:number;
 	MassivOfVideoAdd:Array<any>;
 	OBjectvidio:any;
 	MassivOfVideo:Array<any>;
 	MassivOfVideoNew:Array<any>=[];
 	videotest:any;
 	stopFlag:boolean=true;
	constructor (
		private httpService: HttpService){
		this.getpages();
		
		this.wheel();
	}
	onclickButton(){
		if(this.show===false){this.hidden();}
			else{
			var element=document.querySelector('.content_wrapper');
			element.scrollTop=0;
			this.onSelectedPage(1);
			}
	}
	onCheckEnter(e:KeyboardEvent){
		console.log(e.keyCode);
		console.log(e.keyCode==13);
		if(e.keyCode==13){this.onclickButton();
		}
		
	}
	wheel(){
		document.onwheel = (e) =>{
		var element=document.querySelector('.content_wrapper');
		var parent:any= e.target;
		parent=parent.parentNode;
		
		if (e.target!= element){
		while(parent!==document&&parent!==element){
			parent=parent.parentNode;
			
		}}
  		if (parent==document) return;
  		function getScrollPercent() {
		return ((element.scrollTop || element.scrollTop) 
    	/( (element.scrollHeight || element.scrollHeight) 
    	- element.clientHeight) 
    	*100);
		}
	
		if (getScrollPercent()>50){
			console.log(this.stopFlag);
			if(this.stopFlag==true){
			this.onSelectedPage(this.selectedPage+1);
			this.stopFlag=false;
			}
		;}
		
		console.log(getScrollPercent());
  		var delta = e.deltaY || e.detail || e.wheelDelta;
 			 if (delta < 0 && element.scrollTop == 0) {
 			/* this.onSelectedPage(this.selectedPage-1);*/
    		e.preventDefault();
  		}
 	 	if (delta > 0 && element.scrollHeight - element.clientHeight - element.scrollTop <= 1) {
   	 		
   	 		
   	 		e.preventDefault();
  		}
    
		};
	}
	main(page:number){
		this.getQuantity();
		if (page==1){
			this.httpService.getSearch(this.title,this.selectedPage,this.quantity).subscribe((data:VideoSearchBase)=>{
				this.OBjectvidio=data;
				this.MassivOfVideo=data.items;
				console.log(data);			
				this.MassivOfVideo.map((item, i, arr)=> {
					var Video=this.MassivOfVideo[i].id.videoId;
					this.httpService.getVidios(Video).subscribe((res)=>{
					var response = res.json();
					this.MassivOfVideo[i].video=response;
					});
				});
			});
		}
		else{
			this.httpService.getSearch(this.title,this.selectedPage,this.quantity).subscribe((data:VideoSearchBase)=>{
				this.OBjectvidio=data;
				this.MassivOfVideoAdd=data.items;		
				this.MassivOfVideoAdd.map((item, i, arr)=> {
					var Video=this.MassivOfVideo[i].id.videoId;
					this.httpService.getVidios(Video).subscribe((res)=>{
						var response = res.json();
						this.MassivOfVideo[i].video=response;
					});
				});
				this.stopFlag=true;	
			});	
		Array.prototype.push.apply(this.MassivOfVideo,this.MassivOfVideoAdd);
		}
	}
	addVideo(){

	}


	getvidio(idVidio:string){
			 this.httpService.getVidios(idVidio).map((res)=>{
				this.videotest=res.json();
			});
			 
	}
	
	getQuantity(){
		var width=document.documentElement.clientWidth;
		this.quantity=10;
	}
	hidden(){
		
		this.show = true;
		var element = document.querySelector('.center');
		element.classList.remove("center");
		element=document.querySelector('.center_wrapper');
		element.classList.remove("center_wrapper");
		element.classList.add("top");
		this.onSelectedPage(1);

	}
	getCard(){

	}
	getpages(){
		this.maxPage=this.minPage+6
		this.pages=[];
		for (var i=0; i <=6; i++) {
			this.pages[i]=this.minPage+i;
		}
		
	}
	getsize(){
		function resizedw(){
			this.main();	
		}

		var doit:any;
		window.onresize = ()=>{
		  clearTimeout(doit);
		  doit = setTimeout(resizedw.bind(this), 100);
		};
	}
	onSelectedVideo(video:any){
	console.log('onSelectedVideo');
	console.log(video);
	this.video=video;
	this.videoid=video.id.videoId;
	localStorage.setItem('videoId', this.videoid);
	localStorage.setItem('channelTitle', this.video.snippet.channelTitle);
	localStorage.setItem('videoIMG', this.video.snippet.thumbnails.medium.url);
	localStorage.setItem('title', this.video.snippet.title);
	
	
	}
	onSelectedPage(page:number){
		this.selectedPage=page;
		this.main(this.selectedPage);
		if (page===this.maxPage){
			this.minPage+=3;
			
			this.getpages();
		}
		if (page==this.minPage){	
			this.minPage=this.minPage-3;
			
			if (this.minPage<=0){this.minPage=1}
			this.getpages();
		}
	}
}
 