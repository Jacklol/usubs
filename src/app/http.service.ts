
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HttpService{
    private _repeatTime = 1000 * 0.01; 
    ink=0;
    jack:any=undefined;
    
    constructor(private http: Http){
    }
     
    getSearch(title:string,page:number,quantity:number) : Observable<any>{

       var stopPolling = new Subject();
       var currentTitle = "";
       var tany:any="tany";
       var pagetoken='';
       var requestStarted = false;

       if(title===undefined||title===''){title="google"}
       
              
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
                      

                        pagetoken=res.nextPageToken;
                                            
                        this.ink++;
                        if (this.ink===page){
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
    getVidios(idVidio:string){
        
        
         return  this.http.get('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&'
             +'id='+idVidio+'&part=snippet,statistics')
             
    }
}
