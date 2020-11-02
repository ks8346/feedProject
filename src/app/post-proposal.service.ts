import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Proposal} from './proposal'
@Injectable({
  providedIn: 'root'
})
export class PostProposalService {
  private url=""
  constructor(private http:HttpClient) { }
  postProposal(data,userId){
    data.userId=userId
    return this.http.post(this.url,data)
  }
}
