import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feed } from './feed';
import {FeedParams} from './feed-params'
@Injectable({
  providedIn: 'root'
})
export class GetProposalsService {
  url="http://localhost:8080/feed/all"
  nextUrl="/assets/data/feed1.json"
  
  constructor(private _http:HttpClient) { }
  getPosts(data:FeedParams): Observable<Feed[]>{
    console.log(data)
    return this._http.post<Feed[]>(this.url,data);
   
  }
  getNextPost():Observable<Feed[]>{
    if(true){
      return this._http.get<Feed[]>(this.nextUrl);
    }
  }

}
