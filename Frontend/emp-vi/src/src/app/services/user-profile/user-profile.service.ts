import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from 'src/app/model/authentication-request.model';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/model/UserProfile.model';
import { UserPaymentMethods } from 'src/app/model/user-payment-methods.model';

const API_URL = "http://localhost:8081/user/";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(public http : HttpClient) { }
  
  getProfileDetails(userName : string ) : Observable<UserProfile>{
//    let headers = new HttpHeaders({'loggedInUser': sessionStorage.getItem('user')});
    return this.http.get<UserProfile>(API_URL+userName+"/profile");
  }

  getPaymentMethods(userName : string) : any{
    return this.http.get<Array<UserPaymentMethods>>(API_URL+userName+"/payments");
  }

  makeDefault(userName : string, paymentId : string) : any{
    console.log("request")
    console.log(userName);
    console.log(paymentId);
    return this.http.get<Array<UserPaymentMethods>>(API_URL+userName+"/"+paymentId);
  }

}