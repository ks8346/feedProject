import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Comment} from './comment'
@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  postUrl=""
  getUrl=""
  constructor(private http:HttpClient) { }
  postComment(id:number,new_comment:Comment,userId:string):Observable<any>{
    return this.http.post(this.postUrl,{id,new_comment,userId})
  }
  postLike(id:number,userId:string):Observable<any>{
    return this.http.post(this.postUrl,{id:id,userId:userId})
  }
  getComment(id:number):Observable<Comment[]>{
    return this.http.get<Comment[]>(this.getUrl)
  }
}
