import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  url=""
  constructor(private http:HttpClient) { }
  postComment(id:number,new_comment:string,userId:string){
    this.http.post(this.url,{id,new_comment,userId})
  }
  postLike(id:number,userId:string){
    this.http.post(this.url,{id,userId})
  }
}
