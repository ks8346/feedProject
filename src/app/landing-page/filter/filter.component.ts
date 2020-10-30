import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
 

 public date:Date[];

 @Output() parentFunctionFilter:EventEmitter<any> = new EventEmitter<any>();
  constructor() { 
  
  }

  ngOnInit(): void {
  
  }
  processFilter(startDate, endDate)
  { 
    this.date = [startDate,endDate]
   
    if(startDate=="" || endDate=="")
    alert("Please select both Start date and End date !!")
    else
    if(startDate>endDate)
    alert("Start Date can not be Greater then End Date")
    else
     this.sendData(this.date);


   
  }

  selectionChanged(changed)
  { 
     this.sendData(changed);
  }

  sendData(data)
  {
         this.parentFunctionFilter.emit(data) 
  }

}
