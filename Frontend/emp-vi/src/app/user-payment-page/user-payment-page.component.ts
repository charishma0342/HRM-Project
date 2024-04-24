import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddPaymentRequest } from '../model/add-payment-request.model';
import { UserPaymentMethods } from '../model/user-payment-methods.model';
import { UserProfileService } from '../services/user-profile/user-profile.service';
import { UserAuthService } from '../services/user-login/user-auth.service';

@Component({
  selector: 'app-user-payment-page',
  templateUrl: './user-payment-page.component.html',
  styleUrls: ['./user-payment-page.component.css']
})
export class UserPaymentPageComponent implements OnInit {

  userId : any;
  userPaymentMethods : Array<UserPaymentMethods>;

  myFormGroup : FormGroup;

  showAddCardDetails : boolean = false;

  constructor(formbuilder : FormBuilder, public service : UserProfileService, public userService : UserAuthService) { 
    this.userId = sessionStorage.getItem('id');
    this.myFormGroup=formbuilder.group({
      "paymentName" : new FormControl("", [Validators.required]),
      "cardNumber" : new FormControl("",[Validators.required]),
      "cardName" : new FormControl("",[Validators.required]),
      "expiryDate" : new FormControl("",[Validators.required]),
      "cvv" : new FormControl("",[Validators.required])
    })
    service.getPaymentMethods(this.userId).subscribe(response => {
      console.log(response);
      this.userPaymentMethods = response;
      console.log(this.userPaymentMethods);
    })
  }

  makeDefault(value){
    console.log(this.userId)
    console.log(value);
    this.service.makeDefault(this.userId, value).subscribe(response => {
      console.log(response);
      this.userPaymentMethods = response;
      console.log(this.userPaymentMethods);
    })
  }

  add(){
    this.showAddCardDetails = true;
  }
  
  addNew(){
    let user = new AddPaymentRequest(
      this.myFormGroup.controls['paymentName'].value,
      this.myFormGroup.controls['cardNumber'].value,
      this.myFormGroup.controls['cardName'].value,
      this.myFormGroup.controls['expiryDate'].value,
      this.myFormGroup.controls['cvv'].value,
      true,
  )
  this.userService.addPaymentMethod(user,this.userId).subscribe(response => {
    console.log(response);
    this.userPaymentMethods = response;
    console.log(this.userPaymentMethods);
    this.showAddCardDetails = false;
  })
  }

  ngOnInit(): void {
  }

}
