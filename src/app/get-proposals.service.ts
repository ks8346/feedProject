import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feed } from './feed';

@Injectable({
  providedIn: 'root'
})
export class GetProposalsService {
  url="/assets/data/feed.json"
  nextUrl="/assets/data/feed1.json"
  constructor(private _http:HttpClient) { }
  getPosts(): Observable<Feed[]>{
    return this._http.get<Feed[]>(this.url);
  }
  getNextPost():Observable<Feed[]>{
    if(true){
      return this._http.get<Feed[]>(this.nextUrl);
    }
  }

}
