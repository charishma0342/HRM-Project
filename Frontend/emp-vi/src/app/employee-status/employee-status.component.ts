import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FlightStatusResponse } from '../model/flight-status-response.model';
import { FlightSearchService } from '../services/flight-search/flight-search-service';

@Component({
  selector: 'app-emp-status',
  templateUrl: './employee-status.component.html',
  styleUrls: ['./employee-status.component.css']
})
export class EmployeeStatusComponent implements OnInit {

  empControl = new FormControl('');
  status : any;
  empResponse : FlightStatusResponse;

  onClick : boolean = false;

  constructor(public service : FlightSearchService) { }

  submit(){
    this.onClick = true;
    console.log(this.empControl.value);
    this.service.getFlightStatus(this.empControl.value).subscribe(response =>{
      console.log(response);
      this.empResponse = response;
    })
  }

  ngOnInit(): void {
  }

}
