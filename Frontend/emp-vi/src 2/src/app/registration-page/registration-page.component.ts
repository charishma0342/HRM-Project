import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Email } from 'src/app/model/email.model';
import { UserModel } from 'src/app/model/UserModel.model';
import { UserRegistrationRequest } from '../model/user-registration-request.model';
import { UserAuthService } from '../services/user-login/user-auth.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  myFormGroup : FormGroup;
  passwordValidation : boolean = false;
  prePasswordCheck : boolean = false;
  passwordLength : boolean = false;
  emailValid : boolean = false;
  //contactValid : boolean = false;
  phoneValidation : boolean = false;
  phoneValidationIsNan : boolean = false;
  sussesfullyRegistered : boolean = false;
  showElement : boolean = false;
  userDate : Date;
  emailNotAvailable : boolean = false;

  usersList : Array<UserModel>
  email : Array<Email>

  constructor(formbuilder : FormBuilder, public router:Router, public userRegistrationService : UserAuthService) {
    this.myFormGroup=formbuilder.group({
      "firstName" : new FormControl("",[Validators.required]),
      "lastName" : new FormControl("",[Validators.required]),
      "email" : new FormControl("",[Validators.required]),
      "userName" : new FormControl("",[Validators.required]),
      "password" : new FormControl("", [Validators.required]),
      "rePassword" : new FormControl("", [Validators.required]),
      "address" : new FormControl("",Validators.required),
      "contact" : new FormControl("",Validators.required),
      "paymentName" : new FormControl("",[Validators.required]),
      "cardNumber" : new FormControl("",[Validators.required]),
      "cardName" : new FormControl("",[Validators.required]),
      "expiryDate" : new FormControl("",[Validators.required]),
      "cvv" : new FormControl("",[Validators.required])
    })
   }

  
  // get gender
  // not using this method now
  // getGender(genders : HTMLInputElement){
  // let gender = genders.value;
  // }
  
  
  
  //check if password and repassword are same

  checkPassword(password : HTMLInputElement,rePassword : HTMLInputElement){
    console.log(rePassword.value);
    console.log(password.value);
    if(password.value.length!=0){
        this.prePasswordCheck = false;
          if(password.value == rePassword.value || rePassword.value.length==0){
              this.passwordValidation = false;
            }else{
                this.passwordValidation = true;
            }
          }else{
                this.prePasswordCheck = true;
    }
  if(rePassword.value.length==0){
    this.prePasswordCheck = false;
  }
  if(this.prePasswordCheck){
    rePassword.value="";
  }
  }

  // Check prePassword
  checkPrePassword(password : HTMLInputElement){
    if(password.value.length>=6 && password.value.length<=12){
      this.passwordLength = false;
      }
      else{
        this.passwordLength = true;
      }
    if(password.value.length!=0){
      this.prePasswordCheck = false;
    }else{
      this.passwordLength = false;
    }
  } 

  //Email Validation

  emailValidation(email : HTMLInputElement){
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value))
    {
      this.emailValid = false;
    }
    else{
      this.emailValid = true;
    }
    if(email.value.length==0){
      this.emailValid = false 
    }
  }  

  // validate Phone number
  phoneNumberValidaton(number : HTMLInputElement){
    let mobilePattern = "^((\\+91-?)|0)?[0-9]{10}$";
    if(number.value.match(mobilePattern) || number.value.length==0){
      this.phoneValidation = false;
    }else{
      this.phoneValidation = true;
    }
    if(!Number.isNaN(parseInt(number.value)) || number.value.length==0 ){
      this.phoneValidationIsNan = false;
    }
    else{
      this.phoneValidationIsNan = true;
    }
  }


  //change date format to YYYY-MM-DD
  checkDate(){
    // console.log("called check date")
    this.userDate = this.myFormGroup.controls['date'].value;
    // console.log(this.userDate);
  }


  // get unique email id
  getEmails(){
    if(this.myFormGroup.controls['email'].value.length==0){
      this.emailNotAvailable = false
    }else{
      this.emailNotAvailable = true
    }
    console.log("in the get usernames")
    // this.userRegistrationService.getAllUsers().subscribe(data =>{
    //   this.usersList = data
    //   for(let names of this.usersList){
    //     if(names.email == this.myFormGroup.controls['email'].value ){
    //       console.log("already in there")
    //       this.emailNotAvailable = true;
    //       break;
    //     }
    //     else{
    //       this.emailNotAvailable = false;
    //       console.log("available")
    //     }
    //   }
    // })
  }  



  //registering the user

  register(){
    console.log(this.emailValid,this.passwordLength,this.passwordValidation,this.phoneValidation);
    if(!this.emailValid &&
       !this.passwordLength &&
       !this.passwordValidation &&
       !this.phoneValidation){
     
      if(this.myFormGroup.controls['firstName'].value.length!=0&&
        this.myFormGroup.controls['lastName'].value.length!=0&&
        this.myFormGroup.controls['email'].value.length!=0&&
        this.myFormGroup.controls['userName'].value.length!=0&&
        this.myFormGroup.controls['password'].value.length!=0&&
        this.myFormGroup.controls['rePassword'].value.length!=0&&
        this.myFormGroup.controls['address'].value.length!=0 && 
        this.myFormGroup.controls['contact'].value.length!=0&&
        this.myFormGroup.controls['paymentName'].value.length!=0&&
        this.myFormGroup.controls['cardNumber'].value.length!=0&&
        this.myFormGroup.controls['cardName'].value.length!=0&&
        this.myFormGroup.controls['expiryDate'].value.length!=0&&
        this.myFormGroup.controls['cvv'].value.length!=0){

          let user = new UserRegistrationRequest(
              this.myFormGroup.controls['userName'].value,
              this.myFormGroup.controls['firstName'].value,
              this.myFormGroup.controls['lastName'].value,
              this.myFormGroup.controls['email'].value,
              this.myFormGroup.controls['address'].value,
              this.myFormGroup.controls['contact'].value,
              this.myFormGroup.controls['password'].value,
              this.myFormGroup.controls['paymentName'].value,
              this.myFormGroup.controls['cardNumber'].value,
              this.myFormGroup.controls['cardName'].value,
              this.myFormGroup.controls['expiryDate'].value,
              this.myFormGroup.controls['cvv'].value,
              true,
          )
          
          this.userRegistrationService.addUser(user).subscribe((response)=>{
            console.log(response);
            console.log("register user");
            this.myFormGroup.controls['firstName'].reset();
            this.myFormGroup.controls['lastName'].reset();
            this.myFormGroup.controls['email'].reset();
            this.myFormGroup.controls['password'].reset();
            this.myFormGroup.controls['rePassword'].reset();
            this.myFormGroup.controls['userName'].reset();
            this.myFormGroup.controls['contact'].reset();
            this.myFormGroup.controls['address'].reset();
            this.myFormGroup.controls['paymentName'].reset();
            this.myFormGroup.controls['cardNumber'].reset();
            this.myFormGroup.controls['cardName'].reset();
            this.myFormGroup.controls['expiryDate'].reset();
            this.myFormGroup.controls['cvv'].reset();
            this.showElement = true;
            setTimeout(function() {
              console.log('hide');
              this.showElement = false;
              this.router.navigate(['/login'])
            }.bind(this), 3000);
          },
          // failure function
          failureData => {
            console.log(failureData);
            //alert("email alredy taken")
            this.emailNotAvailable = true;
            setTimeout(function() {
              console.log('hide');
              this.emailNotAvailable = false;
            }.bind(this), 3000);
          });
      }
      else{
        alert("Required every Field");
      }
    }else{
      alert("enter valid details");
    }
    
  }



  ngOnInit(): void {
    // this.userRegistrationService.getAllUsers();
  }

}
