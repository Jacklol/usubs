import { Component,OnInit} from '@angular/core';
import { HttpService} from '../http.service';
import { Response} from '@angular/http';
import {VideoSearchBase} from '../interface';
import { Router} from '@angular/router';
@Component({
  selector: 'my-app',
  template: `
  <a routerLink="" (click)='changeShow()'><img src="../../logo.png"> </a>
  	<div class="container">
	  	<div class="middle_center_wrapper">
	  		<div class='top'   *ngIf="show||!isMobile">
	  			<search [(Title)]="title" (onCheckEnter)="onCheckEnter($event)"
	  			(onclickButton)="onclickButton()"></search>
	  		</div>
	  		<div class="middle">
	  			<a [routerLink]=""(click)='changeShow()' *ngIf="!show&&isMobile"> ВОЗВРАТ</a>
		  		<router-outlet ></router-outlet>	
		  	</div>
		</div>

		<div class='content_wrapper' *ngIf="show||!isMobile">
		 	<div class='content'>
		  			<SideBar 
		  			[title]="title"
		  				[arrayOfVideo]="arrayOfVideo"
		  			 	(onChanged)="onSelectedVideo($event)">
		  			</SideBar>
		  	</div>		
		</div>	
 	</div>	
 	 
  `, providers: [HttpService], styleUrls: ["./css/app-component.css"]
})
export class AppComponent {
	nextPageToken="";
	isMobile:boolean=false;
	stop:boolean=false;
	show: boolean=true;
	nothidden:string='';
	videoid:string='';
	video:any;
	idVidio:string;
	quantity:number=10;
	title:string="";
	pages:Array<number>;
	count:number;
	minPage=1;
	maxPage:number;
 	selectedPage:number;
 	arrayOfVideoAdd:Array<any>;
 	OBjectvidio:any;
 	arrayOfVideo:Array<any>;
 	arrayOfVideoNew:Array<any>=[];
 	videotest:any;
 	stopFlag:boolean=true;
	constructor (
		private router: Router,
		private httpService: HttpService){
		
		this.getpages();
		this.wheel();
		this.resizeinit();
	}
	ngOnInit(){
		console.log(localStorage.getItem('show'));
			var str = window.location.pathname;
	if(localStorage.getItem('show')=='false'){
		this.show=false;
	};
	
			if (window.location.pathname!=='/'){
		this.title=localStorage.getItem('title');}else{
			this.title='';
		
		}
		
	this.onSelectedPage(1);
	
		if(document.documentElement.clientWidth<600){this.isMobile=true;}

   }
	resizeinit(){
		function debounce(func:any, wait:number) {
			var timeout:any;
			return function() {
				var context = this, args = arguments;
				var later = function() {
					timeout = null;
					 func.apply(context, args);
				};
				var callNow = !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		};
		var myEfficientFn = debounce(()=>{
			if(document.documentElement.clientWidth<600){this.isMobile=true;}
			if(document.documentElement.clientWidth>600){this.isMobile=false;}
		}, 150);
		window.addEventListener('resize', myEfficientFn);
		}
	wheel(){
		document.onwheel = (e) =>{
			
		var element=document.querySelector('.content_wrapper');
		var targetel:any= e.target;
		var parent:any=targetel.parentNode;
		if ((e.target!= element)&&(targetel.parentNode!==null)){
			console.log(targetel.parentNode!==null);
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
				if(this.stop==false){
					if(this.stopFlag==true){
					this.onSelectedPage(this.selectedPage+1);
					this.stopFlag=false;
					}
				}
			;}
  			var delta = e.deltaY || e.detail || e.wheelDelta;
 			if (delta < 0 && element.scrollTop == 0) {
  			}
 	 		if (delta > 0 && element.scrollHeight - element.clientHeight - element.scrollTop <= 1) {
  			}
		};
	}
	main(page:number){

		if (page==1){
			this.stop=false;
			this.httpService.getSearch(this.title,this.selectedPage,this.quantity,this.nextPageToken)
			.map((res)=> res.json()).subscribe((data:VideoSearchBase)=>{
				this.nextPageToken=data.nextPageToken;
				this.OBjectvidio=data;
				this.arrayOfVideo=data.items;
				this.arrayOfVideo.map((item, i, arr)=> {
					var Video=this.arrayOfVideo[i].id.videoId;
					this.httpService.getVidios(Video).subscribe((res)=>{
					var response = res.json();
					this.arrayOfVideo[i].videoinfo=response;
					});
				});
			});
		}
		else{
			this.httpService.getSearch(this.title,this.selectedPage,this.quantity,this.nextPageToken)
			.map((res)=> res.json()).subscribe((data:VideoSearchBase)=>{
				this.nextPageToken=data.nextPageToken;
				this.arrayOfVideoAdd=data.items;
				console.log(data)	;
				if 	(this.arrayOfVideoAdd.length==0){this.stop=true;}
				this.arrayOfVideoAdd.map((item, i, arr)=> {
					var Video=this.arrayOfVideoAdd[i].id.videoId;
					this.httpService.getVidios(Video).subscribe((res)=>{
						var response = res.json();
						this.arrayOfVideoAdd[i].videoinfo=response;
					});
				});
				Array.prototype.push.apply(this.arrayOfVideo,this.arrayOfVideoAdd);
				this.stopFlag=true;	
			})	
		}
	}
	getvidio(idVidio:string){
			 this.httpService.getVidios(idVidio).map((res)=>{
				this.videotest=res.json();
			});
			 
	}
	changeShow(){
		this.show=true;
		localStorage.setItem('show',""+this.show);
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
		var title=this.title;
		this.show=false;
		localStorage.setItem('show',""+this.show);
		this.video=video;
		this.videoid=video.id.videoId;
		localStorage.setItem('videoId', this.videoid);
		localStorage.setItem('channelTitle', this.video.snippet.channelTitle);
		localStorage.setItem('channelTitle', this.video.snippet.channelTitle);
		
	}
	onclickButton(){
		localStorage.setItem('title', this.title); 	
		var title=this.title;
		if (!this.isMobile==true){
			this.show=true;
		
		}
		localStorage.setItem('show',""+this.show);
		this.router.navigate(
            ["VS"], 
            {
                queryParams:{ 
                'search':title         
                }
            }
        );
			var element=document.querySelector('.content_wrapper');
			element.scrollTop=0;
			this.onSelectedPage(1);
	}
	onCheckEnter(e:KeyboardEvent){
		if(e.keyCode==13){this.onclickButton();
		}
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
