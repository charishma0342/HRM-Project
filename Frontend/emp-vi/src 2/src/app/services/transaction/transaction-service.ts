import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from 'src/app/model/authentication-request.model';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TransactionRequest } from 'src/app/model/transaction-request.model';
import { HttpParams } from '@angular/common/http';


const API_URL = "http://localhost:8081/transactions";

@Injectable({
  providedIn: 'root'
})
export class TransactionServie {
  constructor(public http : HttpClient) { }
  
  postTransactions(transactionRequest : TransactionRequest) : any{
    console.log(transactionRequest)
    return this.http.post<any>(API_URL+"/add", transactionRequest);
  }

  getHistory(userIs : any) : any{
    console.log(userIs);
    return this.http.get<any>(API_URL+"/"+userIs);
  }

//   getFlightDetails(flightId : String) : any{
//     console.log(flightId);
//     return this.http.get<FlightResponse>(API_URL+"/"+flightId)
//   }

}