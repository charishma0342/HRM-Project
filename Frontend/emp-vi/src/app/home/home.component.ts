import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { FlightSearchService } from '../services/flight-search/flight-search-service';
import { FlightResponse } from 'src/app/model/flight-response.model';
import { FlightSearchList } from 'src/app/model/flight-search-list.model';
import { MatTableDataSource } from '@angular/material/table';
import { FlightSearchRequest } from '../model/flight-search-request.model';
import { EmployeeRequest } from '../model/employeesearchrequest.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class FlightSearchComponent implements OnInit{
  checkBox = this.formBuilder.group({
    return: false,
  });
  sourceControl = new FormControl('');
  destinationControl = new FormControl('');
  startDate = new FormControl('');
  retrunDate = new FormControl('');
  options1: string[] = ['FRONTEND','BACKEND','TESTER','DEVOPS','FULL_STACK_DEVELOPER'];
  options2: string[] = ['New York','Dallas','Austin','Seattle','Starling','San Francisco','Chicago','Los Angeles'];
  filteredOptions1: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  flightSearchResponse : any;
  flightsList : Array<any>;
  filteredFlightList: Array<FlightResponse>;
  returnFlightsList : Array<FlightResponse>;
  filteredReturnFlightList: Array<FlightResponse>;
  areFlightsAvailable : boolean = false;
  areReturnFlightsAvailable : boolean = false;
  returnFlightsRequired : boolean = false;
  onSearchClick : boolean = false;
  dataSource : any;
  flightSearchRequest : EmployeeRequest;
  firstName : string;
  showFlights : boolean = false;
  showReturnFlights : boolean = false;


  flightAirlineFilter: any;
  flightSortFilter: any;
  flightSortOptions: string[] = ["Price Low to High", "Price High to Low"];
  type: any[] = [];
  expr: any[] = [];
  proj: any[] = [];

  retrunFlightAirlineFilter: any;
  returnFlightSortFilter: any;
  returnFlightSortOptions: string[] = ["Price Low to High", "Price High to Low"];
  returnFlightAirlines: string[] = [];

  constructor(public flightSearchService : FlightSearchService,  public router: Router, private formBuilder : FormBuilder) {
   }

  ngOnInit() {
    this.filteredOptions1 = this.sourceControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter1(value || '')),
    );
    this.filteredOptions2 = this.destinationControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value || '')),
    );
  }

  displayedColumns: any[] = ['flight_number', 'Airline', 'flight_type', 'source', 'destination', 'arrival_time','depart_time', 'rating', 'cost','button'];
  search(){
    this.onSearchClick = true;
    this.areFlightsAvailable = false;
    this.returnFlightsRequired = false;
    console.log(this.sourceControl.value);
    console.log(this.destinationControl.value);
    console.log(this.startDate.value);
    console.log(this.retrunDate.value);
    console.log(this.checkBox.value.return)
    this.flightSearchRequest = new EmployeeRequest(this.sourceControl.value, this.destinationControl.value);
    this.flightSearchService.getEmpList(this.flightSearchRequest).subscribe(response =>{
      this.flightSearchResponse = response;
        console.log(this.flightSearchResponse);
        if(this.flightSearchResponse == null || this.flightSearchResponse.length==0){
          this.areFlightsAvailable = false;
        }else{
          this.flightsList = this.flightSearchResponse;
          this.filteredFlightList = this.flightsList;
          console.log("this.filteredFlightList",this.filteredFlightList)
         this.flightAirlineList();
          this.dataSource = new MatTableDataSource(this.filteredFlightList);
          this.areFlightsAvailable = true;
          this.showFlights = true;
          // if(this.checkBox.value.return){
          //   if(this.flightSearchResponse.returnFlightList.length == 0){
          //     this.areReturnFlightsAvailable = false;
          //   } else{
          //     this.areReturnFlightsAvailable = true;
          //     this.returnFlightsList = this.flightSearchResponse.returnFlightList;
          //     this.retrunFlightAirlineList();
          //     console.log("Return FLights");
          //     console.log(this.returnFlightsList);
          //   }
          // }
        }
      });
  }

  btnClick(value: string){
    this.showFlights = false;
    sessionStorage.setItem("travelFlightId", value);
    this.firstName = sessionStorage.getItem('id');
    if(this.checkBox.value.return){
      this.dataSource = new MatTableDataSource(this.returnFlightsList);
      this.areFlightsAvailable = true;
      this.returnFlightsRequired = true;
      this.showReturnFlights = true;
    } else{
      if(this.firstName == null){
        this.router.navigate(['/login']);
      } else{
        this.router.navigate(['/checkout']);
      }
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  returnBtnClick(value: string){
    sessionStorage.setItem("retrunFlightId", value);
    console.log(sessionStorage.getItem("travelFlightId"));
    console.log(sessionStorage.getItem("retrunFlightId"));
    this.firstName = sessionStorage.getItem('id');
    if(this.firstName == null){
      this.router.navigate(['/login']);
    } else{
      this.router.navigate(['/checkout']);
    }
  }



  flightfilterAirline(value) {
    console.log("filter flights");
    console.log(value);
    console.log(this.flightSortFilter)
    if (value != null) {
      this.filteredFlightList = this.flightsList.filter(flight => flight.type == value);
    } else {
      this.filteredFlightList = this.flightsList;
    }
    if (this.flightSortFilter == "Price Low to High") {
      this.filteredFlightList = this.filteredFlightList.sort((a, b) => a.price - b.price);
    } else if (this.flightSortFilter == "Price High to Low") {
      this.filteredFlightList = this.filteredFlightList.sort((a, b) => b.price - a.price);
    }
    this.dataSource = new MatTableDataSource(this.filteredFlightList);
  }
  flightExpr(value) {
    console.log("filter flights");
    console.log(value);
    console.log(this.flightSortFilter)
    if (value != null) {
      this.filteredFlightList = this.flightsList.filter(flight => flight.flightType == value);
    } else {
      this.filteredFlightList = this.flightsList;
    }
    
    this.dataSource = new MatTableDataSource(this.filteredFlightList);
  }

  flightProj(value) {
    console.log("filter flights");
    console.log(value);
    console.log(this.flightSortFilter)
    if (value != null) {
      this.filteredFlightList = this.flightsList.filter(flight => flight.currentProjectName == value);
    } else {
      this.filteredFlightList = this.flightsList;
    }
    this.dataSource = new MatTableDataSource(this.filteredFlightList);
  }
  sortFLights(value) {
    console.log("sort flights");
    console.log(value);
    console.log(this.flightAirlineFilter);
    if (this.flightAirlineFilter != null) {
      this.filteredFlightList = this.flightsList.filter(flight => flight.airlinesName == this.flightAirlineFilter);
    } else {
      this.filteredFlightList = this.flightsList;
    }
    if (value == "Price Low to High") {
      console.log("filtering low to high")
      this.filteredFlightList = this.filteredFlightList.sort((a, b) => a.price - b.price);
    } else if (value == "Price High to Low") {
      console.log("filtering high to low")
      this.filteredFlightList = this.filteredFlightList.sort((a, b) => b.price - a.price);
    }
    this.dataSource = new MatTableDataSource(this.filteredFlightList);
  }


  returnFlightfilterAirline(value) {
    console.log("filter return flights");
    console.log(value);
    console.log(this.returnFlightSortFilter)
    if (value != null) {
      this.filteredReturnFlightList = this.returnFlightsList.filter(flight => flight.airlinesName == value);
    } else {
      this.filteredReturnFlightList = this.returnFlightsList;
    }
    if (this.returnFlightSortFilter == "Price Low to High") {
      this.filteredReturnFlightList = this.filteredReturnFlightList.sort((a, b) => a.price - b.price);
    } else if (this.returnFlightSortFilter == "Price High to Low") {
      this.filteredReturnFlightList = this.filteredReturnFlightList.sort((a, b) => b.price - a.price);
    }
    this.dataSource = new MatTableDataSource(this.filteredReturnFlightList);
  }

  sortReturnFLights(value) {
    console.log("sort return flights");
    console.log(value);
    console.log(this.retrunFlightAirlineFilter);
    if (this.flightAirlineFilter != null) {
      this.filteredFlightList = this.flightsList.filter(flight => flight.airlinesName == this.flightAirlineFilter);
    } else {
      this.filteredReturnFlightList = this.returnFlightsList;
    }
    if (value == "Price Low to High") {
      console.log("filtering low to high")
      this.filteredReturnFlightList = this.filteredReturnFlightList.sort((a, b) => a.price - b.price);
    } else if (value == "Price High to Low") {
      console.log("filtering high to low")
      this.filteredReturnFlightList = this.filteredReturnFlightList.sort((a, b) => b.price - a.price);
    }
    this.dataSource = new MatTableDataSource(this.filteredReturnFlightList);
  }

  retrunFlightAirlineList() {
    console.log("retrun flight airlines");
    for (let index = 0; index < this.returnFlightsList.length; index++) {
      if (!this.returnFlightAirlines.includes(this.returnFlightsList[index].airlinesName)) {
        console.log(this.returnFlightsList[index].airlinesName);
        this.returnFlightAirlines.push(this.returnFlightsList[index].airlinesName);
      }
    }
    console.log(this.returnFlightAirlines);
  }

  flightAirlineList() {
    console.log("flight airlines");
    for (let index = 0; index < this.flightsList.length; index++) {
      if (!this.expr.includes(this.flightsList[index].type)) {
        console.log(this.flightsList[index].type);
        this.expr.push(this.flightsList[index].type);
      }
      if (!this.proj.includes(this.flightsList[index].currentProjectName)) {
        console.log(this.flightsList[index].currentProjectName);
        this.proj.push(this.flightsList[index].currentProjectName);
      }
    }
    console.log(this.type);
  }

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options1.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options2.filter(option => option.toLowerCase().includes(filterValue));
  }
}
