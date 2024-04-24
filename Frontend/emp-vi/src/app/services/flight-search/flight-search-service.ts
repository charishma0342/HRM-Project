import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from 'src/app/model/authentication-request.model';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FlightResponse } from 'src/app/model/flight-response.model';
import { FlightSearchList } from 'src/app/model/flight-search-list.model';
import { FlightSearchRequest } from 'src/app/model/flight-search-request.model';
import { HttpParams } from '@angular/common/http';
import { EmployeeRequest } from 'src/app/model/employeesearchrequest.model';


const API_URL = "http://localhost:8081/flights";

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {
  addProject(pro: any) {
    return this.http.post("http://localhost:8088/project/add",pro);
  }

  getEmp(a: any):any {
    //throw new Error('Method not implemented.');
    return this.http.get("http://localhost:8088/user/"+a+"/profile");
  }
  constructor(public http : HttpClient) { }
  
  getFlightsList(flightSearchRequest: FlightSearchRequest) : any{
    console.log(flightSearchRequest)
    return this.http.post<FlightSearchList>(API_URL+"/search", flightSearchRequest);
  }

  getEmpList(flightSearchRequest: EmployeeRequest) : any{
    console.log(flightSearchRequest)
    return this.http.post("http://localhost:8088/user/get/users", flightSearchRequest);
  }
  getFlightDetails(flightId : number) : any{
    console.log(flightId);
    return this.http.get<FlightResponse>(API_URL+"/"+flightId)
  }

  getFlightStatus(flightId : any) : any{
    console.log(flightId);
    return this.http.get<string>(API_URL+"/status/"+flightId);
  }

}