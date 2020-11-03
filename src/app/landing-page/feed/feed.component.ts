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
  public new_comment:string;
  public singleComment:string;
  public singleCommentUser:string;
  public canUpdate=false;
  public numberLikes:number;
  public comments:Comment[]=[];
  public show=false;
  public commentVisibility=false;
  public commentsMessage="Comments";
  @Output() update=new EventEmitter;
  @Input() userId:number;
  @Input() type:string;
  public hasLiked=false;
  constructor(public proposalWork:ProposalService) { }
  ngOnInit(): void {
    if(this.type=="yourPost"){
      this.canUpdate=true
    }
    this.numberLikes=this.post.upvotesCount;
    this.proposalWork.getComment(this.post.id).subscribe((data)=>{
        this.comments=this.comments.concat(data)
        console.log(this.comments)
        if(data.length<=1){
          this.commentVisibility=true
          if(data.length==0){
            this.commentsMessage="No comments on this post yet"
          }
          else{
            this.singleComment=data[0].comment
            this.singleCommentUser=data[0].user.name
            this.commentsMessage="Comments"
          }
        }
        else{
          this.singleComment=data[0].comment
          this.singleCommentUser=data[0].user.name
          this.commentsMessage="Comments"
        }
      }
    )
    this.proposalWork.getLike(this.post.id,this.userId).subscribe((data)=>this.hasLiked=data)
    
    
  }
  postComment(id:number){
    this.proposalWork.postComment(id,this.new_comment,this.userId)
    .subscribe(
      (data)=>{
        this.comments.push({'id':this.post.id,'comment':this.new_comment,'creationDate':new Date(),'user':{
          'id':2,'name':"Kartik Sachdeva"}}) 
        this.new_comment=""
      },error=>console.error(error)
      
    );
    this.comments.push({'id':this.post.id,'comment':this.new_comment,'creationDate':new Date(),'user':{
      'id':2,'name':"Kartik"}})
    this.new_comment=""
    console.log(id+this.userId+this.new_comment)
    // this.comments.push(this.new_comment)
    // this.new_comment.text=""
  }
  postLike(id:number){
    if(this.hasLiked){
      this.proposalWork.postDislike(id,this.userId)
    }
    else{
      this.proposalWork.postLike(id,this.userId)
    }
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
