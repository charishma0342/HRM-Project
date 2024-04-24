import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FlightStatusResponse } from '../model/flight-status-response.model';
import { FlightSearchService } from '../services/flight-search/flight-search-service';

@Component({
  selector: 'app-flight-status',
  templateUrl: './flight-status.component.html',
  styleUrls: ['./flight-status.component.css']
})
export class FlightStatusComponent implements OnInit {

  flightControl = new FormControl('');
  status : any;
  statusResponse : FlightStatusResponse;

  onClick : boolean = false;

  constructor(public service : FlightSearchService) { }

  submit(){
    this.onClick = true;
    console.log(this.flightControl.value);
    this.service.getFlightStatus(this.flightControl.value).subscribe(response =>{
      console.log(response);
      this.statusResponse = response;
    })
  }

  ngOnInit(): void {
  }

}
