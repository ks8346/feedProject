import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feed } from './feed';
import {FeedParams} from './feed-params'
@Injectable({
  providedIn: 'root'
})
export class GetProposalsService {
  url="localhost:8080/feed/all"
  nextUrl="/assets/data/feed1.json"
  data:FeedParams
  constructor(private _http:HttpClient) { }
  getPosts(): Observable<Feed[]>{
    return this._http.post<Feed[]>(this.url,this.data);
  }
  getNextPost():Observable<Feed[]>{
    if(true){
      return this._http.get<Feed[]>(this.nextUrl);
    }
  }

}
