import { Input, Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Video } from '../interface';
@Component({
    selector: 'SideBar',
    template: `
      			<div class="cardOfVideo" *ngFor="let video of videos">
    			    <a  [routerLink]="['']"
                    [queryParams]="{'search':title, 'Id': video.id.videoId}"
                    (click)=change(video)> 
    				    <div class='title'>{{video.snippet.title}}</div>
    				    <div class="img"><img src={{video.snippet.thumbnails.medium.url}}></div>
                        <div class='channelTitle'>{{video.snippet.channelTitle}}</div>
                        <div class='viewCount'>{{video.videoInfo?.items[0].statistics.viewCount|view}}</div>
        				<div class="date">{{video.snippet.publishedAt| date}}</div>
    			    </a> 			 
  			    </div>
      			<div class="no_more"> 
                  <span>no more videos</span>
                </div>
              `
    , styleUrls: ["./css/sidebar.css"]
})
export class SideBar {
    @Input() title: string;
    @Input() videos: Array<Video>;
    @Output() onChanged = new EventEmitter<Video>();
    change(video: Video) {
        this.onChanged.emit(video);
    }
}