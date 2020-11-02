import { Component, OnInit ,HostListener} from '@angular/core';
import { GetProposalsService } from '../get-proposals.service';
import {MatDialog} from '@angular/material/dialog';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import {PostProposalService} from 'src/app/post-proposal.service'
import { FeedParams } from '../feed-params';
import {TeamsService} from '../teams.service'
import {Teams} from '../teams'
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  message=null;
  menuVisibility=true;
  menuButton=false;
  innerWidth;
  _teams:Teams[];
  feed=[];
  newFeed=[];
  name="Kartik";
  userId=3;
  type="allPost";
  page=0;
  endMessage="";
  startDate=new Date()
  data=new FeedParams(new Date(this.startDate.setDate(this.startDate.getDate()-30)),new Date(),"0","10")
  constructor(public post:PostProposalService,public dialog:MatDialog,private getProposals:GetProposalsService,private teams:TeamsService) { }

  ngOnInit(): void {
    this.getProposals.getAllPosts(this.data).subscribe((data)=>{
      this.feed=data
      console.log(data)
    },
    (error)=>console.log(error));
    this.teams.getTeams().subscribe((data)=>this._teams=data);
  }
  getAll(){
    this.getProposals.getAllPosts(this.data).subscribe((data)=>this.feed=data,(error)=>console.log(error));
  }
  getTeam(){
    this.getProposals.getTeamPosts(this.data).subscribe((data)=>this.feed=data,(error)=>console.log(error));
  }
  getYour(){
    this.getProposals.getYourPosts(this.data,this.userId).subscribe((data)=>this.feed=data,(error)=>console.log(error));
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
    this.page=0
    this.data.page=this.page.toString()
    this.selectApi(this.type)
  }
  onScroll(){
    if(this.newFeed.length>0 || this.page==0){
      this.page++
      this.data.page=this.page.toString()
      console.log(this.data)
      if(this.type=="allPost")
        this.getProposals.getAllNextPost(this.data).subscribe((data)=>this.newFeed=data)
      else if(this.type=="teamPost")
        this.getProposals.getTeamNextPost(this.data).subscribe((data)=>this.newFeed=data)
      else if(this.type=="yourPost")
        this.getProposals.getYourNextPost(this.data,this.userId).subscribe((data)=>this.newFeed=data)
      if(this.newFeed.length==0){
        this.endMessage="No More Posts"
      }
      this.feed=this.feed.concat(this.newFeed)
      console.log(this.newFeed)
    }
  }
  openDialog(id?:number){
    let dialogRef = this.dialog.open(CreateProposalComponent, {
      height: '400px',
      width: '600px',
      data:{name:this.userId,id,teams:this._teams}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result.Proposal} `);
      this.post.postProposal(result,this.userId)
      this.page=0
      this.data.page=this.page.toString()
      this.selectApi(this.type)
    });
  }
  showMenu(){
    if(this.menuVisibility){
      this.menuVisibility=false
    }
    else{
      this.menuVisibility=true
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    if(this.innerWidth<916){
      this.menuButton=true
    }
    else{
      this.menuButton=false
      this.menuVisibility=true
    }
  }
}
