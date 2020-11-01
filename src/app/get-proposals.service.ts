import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feed } from './feed';
import {FeedParams} from './feed-params'
@Injectable({
  providedIn: 'root'
})
export class GetProposalsService {
  allUrl="http://localhost:8080/feed/all"
  allNextUrl="http://localhost:8080/feed/all"
  teamUrl="http://localhost:8080/feed/all"
  teamNextUrl="http://localhost:8080/feed/all"
  yourUrl="http://localhost:8080/feed/all"
  yourNextUrl="http://localhost:8080/feed/all"
  
  constructor(private _http:HttpClient) { }
  getAllPosts(data:FeedParams): Observable<Feed[]>{
    console.log(data)
    return this._http.post<Feed[]>(this.allUrl,data,{responseType:'json'});
  }
  getAllNextPost(data:FeedParams):Observable<Feed[]>{
    if(true){
      return this._http.post<Feed[]>(this.allNextUrl,data);
    }
  }
  getTeamPosts(data:FeedParams): Observable<Feed[]>{
    console.log(data)
    return this._http.post<Feed[]>(this.teamUrl,data);
   
  }
  getTeamNextPost(data:FeedParams):Observable<Feed[]>{
    if(true){
      return this._http.post<Feed[]>(this.teamNextUrl,data);
    }
  }
  getYourPosts(data:FeedParams): Observable<Feed[]>{
    console.log(data)
    return this._http.post<Feed[]>(this.yourUrl,data);
   
  }
  getYourNextPost(data:FeedParams):Observable<Feed[]>{
    if(true){
      return this._http.post<Feed[]>(this.yourNextUrl,data);
    }
  }

}
