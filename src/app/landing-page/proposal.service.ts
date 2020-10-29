import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  url=""
  constructor(private http:HttpClient) { }
  postComment(id:number,new_comment:string,userId:string):Observable<any>{
    return this.http.post(this.url,{id,new_comment,userId})
  }
  postLike(id:number,userId:string):Observable<any>{
    return this.http.post(this.url,{id,userId})
  }
}
