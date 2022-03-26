import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from "@angular/forms"
import { compareValue } from 'src/shared/validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'reactive-form';
  signUpForm!:FormGroup;
  submitted=false;
  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.signUpForm=this.fb.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",[Validators.required,Validators.email]],
      passWord:["",[Validators.required,Validators.minLength(6)]],
      cPassword:["",Validators.required],
      termsAndConditions:[false,Validators.requiredTrue],

    },
    {
      validator: compareValue("passWord","cPassword")
    }
    )
  }

  get h():any{
    return this.signUpForm.controls
  }

  resetForm(){
    this.submitted=false;
    this.signUpForm.reset()
  }

  submitForm(){
    this.submitted=true;
    if(this.signUpForm.invalid){
      return
    }
    else{
      alert(JSON.stringify(this.signUpForm.value))
    }
  }
}
