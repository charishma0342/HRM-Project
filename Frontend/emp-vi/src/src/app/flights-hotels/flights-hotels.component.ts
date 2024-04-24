import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FlightSearchService } from '../services/flight-search/flight-search-service';
import { FlightResponse } from 'src/app/model/flight-response.model';
import { FlightSearchList } from 'src/app/model/flight-search-list.model';
import { MatTableDataSource } from '@angular/material/table';
import { FlightSearchRequest } from '../model/flight-search-request.model';
import { HotelSearchRequest } from '../model/hotel-search-request.model';
import { HotelSearchService } from '../services/hotels/hotel-service';
import { HotelRoomResponse } from '../model/hotel-room-response.model';
import { HotelResponse } from '../model/hotel-response.model';
import { HotelSearchResponse } from '../model/hotel-search-response.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-flights-hotels',
  templateUrl: './flights-hotels.component.html',
  styleUrls: ['./flights-hotels.component.css']
})
export class FlightsHotelsComponent implements OnInit {

  model: any;

  checkBox = this.formBuilder.group({
    return: false,
  });



  sourceControl = new FormControl('');
  destinationControl = new FormControl('');
  startDate = new FormControl('');
  retrunDate = new FormControl('');


  options1: string[] = ['Chandigarh', 'Delhi', 'Mumbai', 'Austin', 'Dallas', 'Houston'];
  options2: string[] = ['Chandigarh', 'Delhi', 'Mumbai', 'Austin', 'Dallas', 'Houston'];
  filteredOptions1: Observable<string[]>;
  filteredOptions2: Observable<string[]>;


  flightSearchResponse: FlightSearchList;
  flightsList: Array<FlightResponse>;
  filteredFlightList: Array<FlightResponse>;
  returnFlightsList: Array<FlightResponse>;
  filteredReturnFlightList: Array<FlightResponse>;
  dataSource: any;
  flightSearchRequest: FlightSearchRequest;
  firstName: string;


  hotelRoomResponseList: Array<HotelRoomResponse>;
  hotelList: Array<HotelResponse>;
  filteredHotelList: Array<HotelResponse>;
  hotelSearchResponse: HotelSearchResponse;
  hotelSearchRequest: HotelSearchRequest;
  numberOfDays: any;


  onSearchClick: boolean = false;


  areFlightsAvailable: boolean = false;
  showFLights: boolean = false;


  areHotelsAvailable: boolean = false;
  showHotels: boolean = false;

  returnFlightsRequired: boolean = false;
  areReturnFlightsAvailable: boolean = false;

  franchiseFilter: any;
  sortFilter: any;
  sortOptions: string[] = ["Rating Low to High", "Rating High to Low"];
  franchises: string[] = [];


  flightAirlineFilter: any;
  flightSortFilter: any;
  flightSortOptions: string[] = ["Price Low to High", "Price High to Low"];
  flightAirlines: string[] = [];

  retrunFlightAirlineFilter: any;
  returnFlightSortFilter: any;
  returnFlightSortOptions: string[] = ["Price Low to High", "Price High to Low"];
  returnFlightAirlines: string[] = [];



  constructor(public flightSearchService: FlightSearchService, public hotelSearchService: HotelSearchService, public router: Router, private formBuilder: FormBuilder) {
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

  displayedColumns: any[] = ['flight_number', 'Airline', 'flight_type', 'source', 'destination', 'arrival_time', 'depart_time', 'rating', 'cost', 'button'];
  search() {


    this.onSearchClick = true;
    this.showFLights = true;
    this.areFlightsAvailable = false;
    this.returnFlightsRequired = false;

    console.log(this.sourceControl.value);
    console.log(this.destinationControl.value);
    console.log(this.startDate.value);
    console.log(this.retrunDate.value);
    console.log(this.checkBox.value.return)
    this.flightSearchRequest = new FlightSearchRequest(this.sourceControl.value, this.destinationControl.value, new Date(this.startDate.value + " "), new Date(this.retrunDate.value + " "), this.checkBox.value.return);
    this.flightSearchService.getFlightsList(this.flightSearchRequest).subscribe(response => {
      this.flightSearchResponse = response;
      console.log(this.flightSearchResponse);
      if (this.flightSearchResponse == null || this.flightSearchResponse.flightList.length == 0) {
        this.areFlightsAvailable = false;
      } else {
        this.flightsList = this.flightSearchResponse.flightList;
        this.filteredFlightList = this.flightsList;
        this.flightAirlineList();
        this.dataSource = new MatTableDataSource(this.filteredFlightList);
        this.areFlightsAvailable = true;
        if (this.checkBox.value.return) {
          if (this.flightSearchResponse.returnFlightList.length == 0) {
            this.areReturnFlightsAvailable = false;
          } else {
            this.areReturnFlightsAvailable = true;
            this.returnFlightsList = this.flightSearchResponse.returnFlightList;
            this.retrunFlightAirlineList();
            console.log("Return FLights");
            console.log(this.returnFlightsList);
          }
        }
      }
    });

    this.hotelSearchRequest = new HotelSearchRequest(this.destinationControl.value, "", new Date(this.startDate.value + " "), new Date(this.retrunDate.value + " "));
    this.hotelSearchService.getHotels(this.hotelSearchRequest).subscribe(response => {
      this.hotelSearchResponse = response;
      console.log(this.hotelSearchResponse);
      if (this.hotelSearchResponse == null) {
        this.areHotelsAvailable = false;
      } else {
        this.hotelList = this.hotelSearchResponse.hotelResponseList;
        this.filteredHotelList = this.hotelList;
        this.franchiseList();
        this.numberOfDays = this.hotelSearchResponse.numberOfDays;
        this.areHotelsAvailable = true;
      }
    });
  }

  btnClick(value: string) {
    sessionStorage.setItem("travelFlightId", value);
    this.showFLights = false;
    if (this.checkBox.value.return) {
      this.dataSource = new MatTableDataSource(this.returnFlightsList);
      this.returnFlightsRequired = true;
    } else {
      this.showHotels = true;
    }
    console.log("show flights");
    console.log(this.areFlightsAvailable);
    console.log("show retrun flights");
    console.log(this.returnFlightsRequired);
    console.log("show hotels");
    console.log(this.showHotels);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  returnBtnClick(value: string) {
    this.returnFlightsRequired = false;
    sessionStorage.setItem("retrunFlightId", value);
    console.log(sessionStorage.getItem("travelFlightId"));
    console.log(sessionStorage.getItem("retrunFlightId"));
    this.showHotels = true;
    console.log("show flights");
    console.log(this.areFlightsAvailable);
    console.log("show retrun flights");
    console.log(this.returnFlightsRequired);
    console.log("show hotels");
    console.log(this.showHotels);
  }

  hotelBtnClick(value: string) {
    this.showHotels = false;
    sessionStorage.setItem("hotelRoomId", value);
    sessionStorage.setItem("hotelcheckInDate", this.startDate.value);
    sessionStorage.setItem("hotelcheckOutDate", this.retrunDate.value);
    sessionStorage.setItem("hotelCheckInDays", this.numberOfDays);
    this.firstName = sessionStorage.getItem('id');
    console.log("------------------------------------");
    console.log(this.firstName);
    console.log("------------------------------------");
    console.log("show flights");
    console.log(this.areFlightsAvailable);
    console.log("show retrun flights");
    console.log(this.returnFlightsRequired);
    console.log("show hotels");
    console.log(this.showHotels);
    if (this.firstName == null) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/checkout']);
    }
  }


  filterFranchise(value) {
    console.log("filter");
    console.log(value);
    console.log(this.sortFilter)
    if (value != null) {
      this.filteredHotelList = this.hotelList.filter(hotel => hotel.franchiseName == value);
    } else {
      this.filteredHotelList = this.hotelList;
    }
    if (this.sortFilter == "Rating Low to High") {
      this.filteredHotelList = this.filteredHotelList.sort((a, b) => a.rating - b.rating);
    } else if (this.sortFilter == "Rating High to Low") {
      this.filteredHotelList = this.filteredHotelList.sort((a, b) => b.rating - a.rating);
    }
  }

  sortHotels(value) {
    console.log("sort");
    console.log(value);
    console.log(this.franchiseFilter);
    if (this.franchiseFilter != null) {
      this.filteredHotelList = this.hotelList.filter(hotel => hotel.franchiseName == this.franchiseFilter);
    } else {
      this.filteredHotelList = this.hotelList;
    }
    if (value == "Rating Low to High") {
      this.filteredHotelList = this.filteredHotelList.sort((a, b) => a.rating - b.rating);
    } else if (value == "Rating High to Low") {
      this.filteredHotelList = this.filteredHotelList.sort((a, b) => b.rating - a.rating);
    }
  }



  flightfilterAirline(value) {
    console.log("filter flights");
    console.log(value);
    console.log(this.flightSortFilter)
    if (value != null) {
      this.filteredFlightList = this.flightsList.filter(flight => flight.airlinesName == value);
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

  franchiseList() {
    console.log("franchises");
    for (let index = 0; index < this.hotelList.length; index++) {
      if (!this.franchises.includes(this.hotelList[index].franchiseName)) {
        console.log(this.hotelList[index].franchiseName);
        this.franchises.push(this.hotelList[index].franchiseName);
      }
    }
    console.log(this.franchises);
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
      if (!this.flightAirlines.includes(this.flightsList[index].airlinesName)) {
        console.log(this.flightsList[index].airlinesName);
        this.flightAirlines.push(this.flightsList[index].airlinesName);
      }
    }
    console.log(this.flightAirlines);
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
