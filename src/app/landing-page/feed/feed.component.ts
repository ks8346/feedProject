import { Component, OnInit ,Input} from '@angular/core';
import { Post } from 'src/app/post';
import {ProposalService} from '../proposal.service'
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  @Input() post:Post;
  public new_comment="";
  @Input() userId:string;
  public hasLiked=false;
  constructor(public proposalWork:ProposalService) { }
  ngOnInit(): void {
  }
  postComment(id:number){
    this.proposalWork.postComment(id,this.new_comment,this.userId);
    console.log(id+this.userId)
    this.new_comment=""
  }
  postLike(id:number){
    this.proposalWork.postLike(id,this.userId);
    console.log("liked "+id+this.userId)
    if(this.hasLiked){
      this.hasLiked=false
    }
    else{
      this.hasLiked=true
    }
  }
}
