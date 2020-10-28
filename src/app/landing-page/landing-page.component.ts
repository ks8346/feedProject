import { Component, Inject, OnInit } from '@angular/core';
import { GetProposalsService } from '../get-proposals.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateProposalComponent } from './create-proposal/create-proposal.component';
import {PostProposalService} from 'src/app/post-proposal.service'
import { Proposal } from '../proposal';
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
  type="Your Posts";
  constructor(public post:PostProposalService,public dialog:MatDialog,private getProposals:GetProposalsService) { }

  ngOnInit(): void {
    this.getProposals.getPosts().subscribe((data)=>this.feed=data);
  }
  onFilter(){
    this.getProposals.getPosts().subscribe((data)=>this.feed=data);

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
      console.log(`Dialog result: ${result.post_text} ${result.id}`);
      this.post.postProposal(result)
    });
  }

}
