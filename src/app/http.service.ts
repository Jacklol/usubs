
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {VideoSearchBase} from './user';

@Injectable()
export class HttpService{
    private _repeatTime = 1000 * 0.01; 
    ink=0;
    
    
    constructor(private http: Http){
    }
     
    getSearch(title:string,page:number,quantity:number) : Observable<VideoSearchBase>{
        this.ink=0;
       var stopPolling = new Subject();
       var currentTitle = "";
       var pagetoken='';
       var requestStarted = false;

       if(title===undefined||title===''){title="google"}
        if(pagetoken===undefined){pagetoken=""}
              
         return  Observable.create((observer:any)=>{
            Observable
                .interval(this._repeatTime)
                .mergeMap(()=> {
                         if (!requestStarted){
                             requestStarted = true;
                             return this.http.get('https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults='
                                +quantity+'&q='+title+'&order=viewCount'+'&pageToken='+pagetoken)
                         }else{
                             return Observable.empty();
                         }
                     })
                .map((res)=>{
                    requestStarted = false;
                    return res.json();}    
                  )

                .takeUntil(stopPolling)
                .subscribe(
                    res => { 
                        console.log("res.nextPageToken");
                      console.log(res.nextPageToken);
                        if (res.nextPageToken!==undefined){
                        pagetoken=res.nextPageToken;
                        }else{
                            pagetoken="";
                        }                    
                        this.ink++;
                        if (this.ink===page){
                            this.ink=0;
                            console.log("this.ink");
                            console.log(this.ink);
                            stopPolling.next(true);
                            observer.next(res);
                            observer.complete();
                        }                       
                    },
                    err => { console.log("Error: "+ err)},
                    () => { }
                );
         
        });
              
    }
    getVidios(idVidio:string){
        
        
         return  this.http.get('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&'
             +'id='+idVidio+'&part=snippet,statistics')
             
    }
    getSubs(idVidio:string){
        return  this.http.get('https://video.google.com/timedtext?hl=en&v='+idVidio+'&type=list&type=list')  
    }
}
