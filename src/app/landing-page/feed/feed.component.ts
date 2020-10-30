import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import { Post } from 'src/app/post';
import {ProposalService} from '../proposal.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  @Input() post:Post;
  public new_comment
  public canUpdate=false;
  public numberLikes=0;
  public comments:string[]
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
    this.comments=this.post.comments;
  }
  postComment(id:number){
    this.proposalWork.postComment(id,this.new_comment,this.userId)
    .subscribe(
      (data)=>{
        this.comments.push(this.new_comment)
        this.new_comment=""
      },error=>console.error("error")
    );
    console.log(id+this.userId+this.new_comment)
    // this.comments.push(this.new_comment)
    // this.new_comment=""
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
    // if(this.hasLiked){
    //   this.hasLiked=false
    //   this.numberLikes-=1;
    // }
    // else{
    //   this.hasLiked=true
    //   this.numberLikes+=1;
    // }
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
