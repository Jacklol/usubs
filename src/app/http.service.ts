import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { VideoSearchBase } from './interface';

@Injectable()
export class HttpService {
    private _repeatTime = 1000 * 0.01;
    ink = 0;
    stop: boolean = false;
    constructor(private http: Http) {
    }
    getSearch(title: string, page: number, quantity: number, nextPageToken: string) {
        if (title === undefined || title === '') { title = " " }
        var pagetoken = nextPageToken
        if (nextPageToken == undefined || page == 0) { pagetoken = "" }
        return this.http.get('https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults='
            + quantity + '&q=' + title + '&order=viewCount' + '&pageToken=' + pagetoken)
    }
    getCaptionSubs(url: string) {
        return this.http.get(url);
    }
    getVideos(idVideo: string) {
        return this.http.get('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&'
            + 'id=' + idVideo + '&part=snippet,statistics')

    }
    getSubs(idVideo: string) {
        return this.http.get('https://video.google.com/timedtext?hl=en&v=' + idVideo + '&type=list&type=list')
    }
    getInfoCaptions(idVideo: string) {
        return this.http.get(' https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=' + idVideo + '&key=AIzaSyDlcg8UFkX8RHWfmo3aWxckbc1Mq95QfwU')
    }

}
