
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {VideoSearchBase} from './interface';

@Injectable()
export class HttpService{
    private _repeatTime = 1000 * 0.01; 
    ink=0;
    stop:boolean=false;
    
    constructor(private http: Http){

    }

    getSearch(title:string,page:number,quantity:number,nextPageToken:string){
        if(title===undefined||title===''){title=" "}
        var pagetoken=nextPageToken
        if(nextPageToken==undefined||page==1){pagetoken=""}
         return this.http.get('https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults='
                                +quantity+'&q='+title+'&order=viewCount'+'&pageToken='+pagetoken)
    }
    getFullSubs(url:string){
         return  this.http.get(url);
    }
    getVidios(idVidio:string){
        
        
         return  this.http.get('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&'
             +'id='+idVidio+'&part=snippet,statistics')
             
    }
    getSubs(idVidio:string){
        return  this.http.get('https://video.google.com/timedtext?hl=en&v='+idVidio+'&type=list&type=list')  
    }
    getInfoCaptions(idVidio:string){
      return  this.http.get(' https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId='+idVidio+'&key=AIzaSyDlcg8UFkX8RHWfmo3aWxckbc1Mq95QfwU')
    }
    getSearcOld(title:string,page:number,quantity:number,nextPageToken:string) : Observable<VideoSearchBase>{
        this.ink=0;
       var stopPolling = new Subject();
       var currentTitle = "";
       var pagetoken:string;
       var requestStarted = false;
       if(title===undefined||title===''){title=""}
       pagetoken=nextPageToken
       if(pagetoken===undefined||page==1){pagetoken=""}
         return  Observable.create((observer:any)=>{
            Observable
                .interval(this._repeatTime)
                .mergeMap(()=> {
                         if (!requestStarted){
                             requestStarted = true;
                             return this.http.get('https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults='
                                +quantity+'&q='+title+'&order=rating'+'&pageToken='+pagetoken)
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
                        console.log(res);
                        if (res.nextPageToken==pagetoken){
                            console.log("koett")
                        }
                        if (res.nextPageToken!==undefined){
                            pagetoken=res.nextPageToken;
                        } 
                        else {
                            pagetoken="";
                        }                    
                        this.ink++;
                        if (true){
                            this.ink=0;
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
}
