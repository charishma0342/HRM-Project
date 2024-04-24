import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AddFeedbackRequest } from '../model/add-feedback-request.model';
import { UserAuthService } from '../services/user-login/user-auth.service';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.css']
})
export class UserFeedbackComponent implements OnInit {

  comments : string;
  option : any;
  commentControl = new FormControl('');
  addedFeedback : boolean = false;
  addFeedbackRequest : AddFeedbackRequest;
  userId : any;

  constructor(public service : UserAuthService) { }

  onItemChange(value){
    this.option = value;
    console.log(value);
  }

  submit(){
    this.userId = sessionStorage.getItem("id");
    console.log("submit");
    console.log(this.option);
    console.log(this.commentControl.value);
    this.addFeedbackRequest = new AddFeedbackRequest(this.userId,this.option,this.commentControl.value);
    this.service.addFeedback(this.addFeedbackRequest).subscribe(response =>{
      if(response){
        this.addedFeedback = true;
      }
    })
  }

  ngOnInit(): void {
  }

}
