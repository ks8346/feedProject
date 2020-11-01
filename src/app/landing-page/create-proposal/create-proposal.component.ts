import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TestServiceService } from '../test-service.service';

@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.css']
})
export class CreateProposalComponent implements OnInit {
  constructor(public dialog:MatDialog,public service:TestServiceService,@Inject(MAT_DIALOG_DATA) public data){}
  teams=[]
  title:string
  Proposal:string
  team:{}
  userId:string
  id:number
  values:TestServiceService;
  ngOnInit(){
    this.teams=this.data.team
    this.userId=this.data.userId
    this.id=this.data.id
  }
  onClear(){
    this.service.form.reset();
    this.service.initialiseFormGroup();
  }
  onSubmit(){
    console.log(this.service.form.value);
    this.values=this.service.form.value
    // console.log({id:this.data.id,title:this.service.form.controls['title'],text:this.service.form.controls['Proposal'],team:this.service.form.controls['team']})
  }

}
