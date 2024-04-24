import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from 'src/app/model/authentication-request.model';
import {map} from 'rxjs/operators';
import { UserRegistrationRequest } from 'src/app/model/user-registration-request.model';
import { AddFeedbackRequest } from 'src/app/model/add-feedback-request.model';
import { AddPaymentRequest } from 'src/app/model/add-payment-request.model';
import { UserPaymentMethods } from 'src/app/model/user-payment-methods.model';

const API_URL = "http://localhost:8081/user/login";
const FEEDBACK_URL = "http://localhost:8081/user/feedback";
const REGISTER_URL = "http://localhost:8081/user";
//export const Forgot_URL="http://localhost:8082/tweets";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  test: Array<{firstName:string, lastName:string}> = [];
  constructor(public http : HttpClient) { }
  login(details : AuthenticationRequest):any{
    return this.http.post("http://localhost:8088/login",details).pipe(
      map((successData : Response)=>{
        console.log(successData); 
        return successData;
      }),
      map(failureData=>{
        console.log(failureData);
        return failureData;
      })
    );
  }

  addUser(request : UserRegistrationRequest):any{
    return this.http.post(REGISTER_URL,request).pipe(
      map((successData : Response)=>{
        console.log(successData); 
        return successData;
      }),
      map(failureData=>{
        console.log(failureData);
        return failureData;
      })
    );
  }

  addFeedback(request : AddFeedbackRequest): any{
    return this.http.post<boolean>(FEEDBACK_URL,request);
  }

  addPaymentMethod(request : AddPaymentRequest, value : any){
    return this.http.post<Array<UserPaymentMethods>>(REGISTER_URL+"/"+value+"/addPayment",request)
  }




  // forgotPassword(username : string, password : string):any{
  //   let newPassword = new NewPassword(password);
  //   return this.http.put(Forgot_URL+"/"+username+"/forgot",newPassword);
  // }
}
