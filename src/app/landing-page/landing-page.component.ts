import { Component, OnInit } from '@angular/core';
import { GetProposalsService } from '../get-proposals.service';
import {MatDialog} from '@angular/material/dialog';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import {PostProposalService} from 'src/app/post-proposal.service'
import { FeedParams } from '../feed-params';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  message=null;
  feed=[];
  newFeed=[];
  name="Kartik";
  userId="ks8346";
  type="Your Post";
  date=new Date()
  data=new FeedParams(new Date(this.date.setDate(this.date.getDate()-30)),new Date(),"0","10")
  constructor(public post:PostProposalService,public dialog:MatDialog,private getProposals:GetProposalsService) { }

  ngOnInit(): void {
    this.getProposals.getPosts(this.data).subscribe((data)=>this.feed=data,(error)=>console.log(error));
  }
  onFilter(data){
   /** this.getProposals.getPosts().subscribe((data)=>this.feed=data);*/
    if(Array.isArray(data))
      console.log(data)
    else
      console.log(data)

  }
  onScroll(){
    console.log("Scrolled")
    this.getProposals.getNextPost().subscribe(data=>this.newFeed=data)
    this.feed=this.feed.concat(this.newFeed)
    console.log(this.newFeed)
  }
  openDialog(id?:number){
    let dialogRef = this.dialog.open(CreateProposalComponent, {
      height: '400px',
      width: '600px',
      data:{name:this.userId,id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result.post_text} ${result.id} ${result.userId}`);
      this.post.postProposal(result)
      this.getProposals.getPosts(this.data).subscribe((data)=>this.feed=data);
    });
  }
}
