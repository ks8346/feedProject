
import { Injectable } from '@angular/core';
import {FormGroup, FormControl,Validators} from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  constructor() { }
  form: FormGroup = new FormGroup({
    key: new FormControl(null),
    title: new FormControl(' ',[Validators.required]),
    description: new FormControl(' ',[Validators.required,Validators.maxLength(300)]),
    teams: new FormControl(0),
  });
  
  initialiseFormGroup(){
    this.form.setValue({
      $key: null,
      title: ' ',
      Proposal:' ',
      team: 0})
  }
}
