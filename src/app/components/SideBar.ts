import { Input, Component,EventEmitter, Output,OnInit} from '@angular/core';
 


@Component({
    selector: 'SideBar',
    template: `
      			<div class="cardOfVideo" *ngFor="let video of arrayOfVideo">
    			    <a  [routerLink]="['VS']"
                [queryParams]="{'search':title, 'Id': video.id.videoId}"
                (click)=change(video)> 
    				    <div class='title'>{{video.snippet.title}}</div>
    				    <div class="img"><img src={{video.snippet.thumbnails.medium.url}}></div>
                <div class='channelTitle'>{{video.snippet.channelTitle}}</div>
                <div class='viewCount'>{{video.videoinfo?.items[0].statistics.viewCount|view}}</div>
        				<div class="date">{{video.snippet.publishedAt| date}}</div>
    			    </a> 			 
  			    </div>
      			<div class="no_more"> 
              <span>no more videos</span>
            </div>
              `
              ,styleUrls: ["./css/Sidebar.css"]
})
export class SideBar{ 
    @Input() title: any;
    @Input() arrayOfVideo:Array<any>;
    @Output() onChanged = new EventEmitter<any>();
    change(video:any) {
        this.onChanged.emit(video);
    }
}