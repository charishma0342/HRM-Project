import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from 'src/app/model/authentication-request.model';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FlightResponse } from 'src/app/model/flight-response.model';
import { FlightSearchList } from 'src/app/model/flight-search-list.model';
import { FlightSearchRequest } from 'src/app/model/flight-search-request.model';
import { HttpParams } from '@angular/common/http';


const API_URL = "http://localhost:8081/flights";

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {
  constructor(public http : HttpClient) { }
  
  getFlightsList(flightSearchRequest: FlightSearchRequest) : any{
    console.log(flightSearchRequest)
    return this.http.post<FlightSearchList>(API_URL+"/search", flightSearchRequest);
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