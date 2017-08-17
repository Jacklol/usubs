import { Input, Component,EventEmitter, Output} from '@angular/core';
 


@Component({
    selector: 'child-comp',
    template: `
      			<div class="test" *ngFor="let video of MassivOfVideo">
  			<a [routerLink]="['video', video.id.videoId]"
                    
                    (click)=change(video)>	
  				<div>{{video.snippet.title}}</div>
  				<img src={{video.snippet.thumbnails.medium.url}}>
  				<div>{{video.snippet.description}}</div>
  				<div>{{video.snippet.publishedAt}}</div>
  			</a> 			 
  			</div>
  			<div class="no_more"> 
          <span>no more videos</span>
        </div>
              `
              ,styles: [
        ` .selected{

        	background-color:green;

        }
        .no_more{
          margin:auto;
          height:600px;
          text-align:center;
          padding:20px;
          font: italic 190% serif;
        }
        .buttons{

        }
        .wrapper{
         margin: auto;
    	width: 75%;
        }
        .test{
        	width:400px;
        	display:block;
        	background-color:#fff223;
        	height:300px;
        	margin:20px 20px 0 0;

        }
        `]


})
export class ChildComponent{ 
	
	
    @Input() video: any;
    @Input() selectedPage: number;
    @Input() MassivOfVideo:Array<any>;
    
    @Output() onChanged = new EventEmitter<any>();
    change(increased:any) {
        this.onChanged.emit(increased);
    }
   
}