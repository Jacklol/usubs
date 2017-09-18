import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Response } from '@angular/http';
import { VideoSearchBase, Video } from '../interface';
import { Router } from '@angular/router';
import { Variable } from '../constant/constant';
import { ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'my-app',
	template: `
  <a routerLink="" (click)='changeShow()' class='logo'><img src="../../logo.png"> </a>
  	<div class="container">
	  	<div class="middle_center_wrapper">
	  		<div class='top'   *ngIf="show||!isMobile">
	  			<search [(title)]="title" 
	  			(onClickButton)="onClickButton()">
	  			</search>
	  		</div>
	  		<div class="middle">
	  			<a [routerLink]=""(click)='changeShow()' *ngIf="!show&&isMobile"><button class="buttonback">Back</button></a>
		  		<router-outlet ></router-outlet>	
		  	</div>
		</div>
		<div class='content_wrapper' *ngIf="show||!isMobile">
		 	<div class='content'>
				<SideBar [title]="title"
		  			[videos]="videos"
		  			(onChanged)="onSelectedVideo($event)">
		  		</SideBar>
		  	</div>		
		</div>	
 	</div>	
 	 
  `, providers: [HttpService], styleUrls: ["./css/app-component.css"]
})
export class AppComponent {
	nextPageToken = "";
	isMobile: boolean = false;
	stop: boolean = false;
	show: boolean = true;
	videoid: string = '';
	quantity: number = Variable.quantity;
	title: string = "";
	selectedPage: number;
	videosAdd: Array<Video> = [];
	videos: Array<Video> = [];
	stopFlag: boolean = true;
	constructor(
		private router: Router,
		private httpService: HttpService,
		private ref: ChangeDetectorRef) {
	}
	ngOnInit() {
		this.wheel();
		this.resizeInit();
		var str = window.location.pathname;
		if (localStorage.getItem('show') === 'false') {
			this.show = false;
		};
		if (window.location.pathname == '/') {
			this.title = localStorage.getItem('title');

		} else {
			this.title = '';
		}
		this.onSelectedPage(0);
		if (document.documentElement.clientWidth < Variable.clientWidth) {
			this.isMobile = true;
		}
	}
	resizeInit() {
		function debounce(func: Function, wait: number) {
			var timeout: NodeJS.Timer;
			return function () {
				var context = this, args = arguments;
				var later = function () {
					timeout = null;
					func.apply(context, args);
				};
				var callNow = !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		};
		var myEfficientFn = debounce(() => {
			if (document.documentElement.clientWidth < Variable.clientWidth) { this.isMobile = true; }
			if (document.documentElement.clientWidth > Variable.clientWidth) { this.isMobile = false; }
		}, Variable.timeResize);
		window.addEventListener('resize', myEfficientFn);
	}
	wheel() {
		document.onwheel = (e) => {
			var element = document.querySelector('.content_wrapper');
			var targetel = <HTMLElement>e.target;
			var parent = targetel.parentNode;
			if ((e.target != element) && (targetel.parentNode !== null)) {

				while (parent !== document && parent !== element) {
					parent = parent.parentNode;
				}
			}
			if (parent == document) return;
			var getScrollPercent = () => {
				return ((element.scrollTop || element.scrollTop)
					/ ((element.scrollHeight || element.scrollHeight)
						- element.clientHeight)
					* 100);
			}
			if (getScrollPercent() > 20) {

				if (!this.stop) {
					if (this.stopFlag == true) {
						this.onSelectedPage(this.selectedPage + 1);
						this.stopFlag = false;
					}
				}
			}
		}
	}
	main(page: number) {
		if (page == 0) {
			this.stop = false;
			this.videos = [];
		}
		this.httpService.getSearch(this.title, this.selectedPage, this.quantity, this.nextPageToken)
			.map((res) => res.json()).subscribe((data: VideoSearchBase) => {
				this.nextPageToken = data.nextPageToken;
				this.videosAdd = data.items;
				if (this.videosAdd.length == 0) {
					this.stop = true;
					return;
				}
				this.videosAdd.map((item, i, arr) => {
					var Video = this.videosAdd[i].id.videoId;
					this.httpService.getVideos(Video).subscribe((res) => {
						var response = res.json();
						this.videosAdd[i].videoInfo = response;
						this.ref.detectChanges();
					});
				});
				Array.prototype.push.apply(this.videos, this.videosAdd);
				this.stopFlag = true;
				this.ref.detectChanges();
			})
	}
	changeShow() {
		this.show = true;
		localStorage.setItem('show', "" + this.show);
	}
	onSelectedVideo(video: Video) {
		var title = this.title;
		this.show = false;
		localStorage.setItem('show', "" + this.show);
		localStorage.setItem('videoId', video.id.videoId);
		localStorage.setItem('channelTitle', video.snippet.channelTitle);
		localStorage.setItem('description', video.videoInfo.items[0].snippet.description);
		localStorage.setItem('description', video.videoInfo.items[0].snippet.description);
	}
	onClickButton() {
		localStorage.setItem('title', this.title);
		var title = this.title;
		if (!this.isMobile == true) {
			this.show = true;
		}
		localStorage.setItem('show', "" + this.show);
		this.router.navigate(
			[], {
				queryParams: {
					'search': title
				}
			}
		);
		var element = document.querySelector('.content_wrapper');
		element.scrollTop = 0;
		this.onSelectedPage(0);
	}
	onSelectedPage(page: number) {
		this.selectedPage = page;
		this.main(this.selectedPage);

	}
}