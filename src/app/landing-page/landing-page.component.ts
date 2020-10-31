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
  type="allPost";
  page=0;
  date=new Date()
  data=new FeedParams(new Date(this.date.setDate(this.date.getDate()-30)),new Date(),"0","10")
  constructor(public post:PostProposalService,public dialog:MatDialog,private getProposals:GetProposalsService) { }

  ngOnInit(): void {
    this.getProposals.getAllPosts(this.data).subscribe((data)=>this.feed=data,(error)=>console.log(error));
  }
  getAll(){
    this.getProposals.getAllPosts(this.data).subscribe((data)=>this.feed=data,(error)=>console.log(error));
  }
  getTeam(){
    this.getProposals.getTeamPosts(this.data).subscribe((data)=>this.feed=data,(error)=>console.log(error));
  }
  getYour(){
    this.getProposals.getYourPosts(this.data).subscribe((data)=>this.feed=data,(error)=>console.log(error));
  }
  selectApi(data){
    if(data==="allPost"){
      this.getAll()
    }
    else if(data==="teamPost"){
      this.getTeam()
    }
    else if(data==="yourPost"){
      this.getYour()
    }
    this.page=-1
  }
  onFilter(data){
    if(Array.isArray(data)){
      console.log(data)
      this.data.startDate=new Date(data[0])
      this.data.endDate=new Date(data[1])
    }
    else{
      console.log(data)
      this.type=data;
    }
    this.selectApi(this.type)
  }
  onScroll(){
    this.page++
    this.data.page=this.page.toString()
    console.log(this.page)
    if(this.type=="allPost")
      this.getProposals.getAllNextPost(this.data).subscribe(data=>this.newFeed=data)
    else if(this.type=="teamPost")
      this.getProposals.getAllNextPost(this.data).subscribe(data=>this.newFeed=data)
    else if(this.type=="yourPost")
      this.getProposals.getAllNextPost(this.data).subscribe(data=>this.newFeed=data)
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
      this.selectApi(this.type)
    });
  }
}
