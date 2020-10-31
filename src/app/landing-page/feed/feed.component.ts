import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import { Post } from 'src/app/post';
import {ProposalService} from '../proposal.service';
import {Comment} from '../comment'
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  @Input() post:Post;
  public new_comment:Comment;
  public canUpdate=false;
  public numberLikes:number;
  public comments:Comment[]
  public show=false;
  public commentVisibility=false;
  @Output() update=new EventEmitter;
  @Input() userId:string;
  @Input() type:string;
  public hasLiked=false;
  constructor(public proposalWork:ProposalService) { }
  ngOnInit(): void {
    if(this.type=="Your Posts"){
      this.canUpdate=true
    }
    // this.comments=this.post.comments;
    this.numberLikes=this.post.upvotesCount;
    this.proposalWork.getComment(this.post.id).subscribe((data)=>this.comments=data)
  }
  postComment(id:number){
    this.proposalWork.postComment(id,this.new_comment,this.userId)
    .subscribe(
      (data)=>{
        this.comments.push(this.new_comment)
        this.new_comment.text=""
      },error=>console.error("error")
    );
    console.log(id+this.userId+this.new_comment)
    // this.comments.push(this.new_comment)
    // this.new_comment.text=""
  }
  postLike(id:number){
    this.proposalWork.postLike(id,this.userId).subscribe(
      (data)=>{
        if(this.hasLiked){
        this.hasLiked=false
        this.numberLikes-=1;
      }
      else{
        this.hasLiked=true
        this.numberLikes+=1;
      }
    },error=>console.error("error"));
    console.log("liked "+id+this.userId)
    if(this.hasLiked){
      this.hasLiked=false
      this.numberLikes-=1;
    }
    else{
      this.hasLiked=true
      this.numberLikes+=1;
    }
  }
  openDialog(id:number){
    this.update.emit(id)
  }
  seeMore(){
    if(this.show){
      this.show=false
    }
    else{
      this.show=true
    }
  }
}
