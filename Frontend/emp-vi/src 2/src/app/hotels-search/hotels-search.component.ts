import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, OperatorFunction } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HotelSearchRequest } from '../model/hotel-search-request.model';
import { HotelSearchService } from '../services/hotels/hotel-service';
import { HotelRoomResponse } from '../model/hotel-room-response.model';
import { HotelResponse } from '../model/hotel-response.model';
import { HotelSearchResponse } from '../model/hotel-search-response.model';

const states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona'
];


@Component({
  selector: 'app-hotels-search',
  templateUrl: './hotels-search.component.html',
  styleUrls: ['./hotels-search.component.css']
})

export class HotelsSearchComponent implements OnInit {
  public model: any;

  formatter = (result: string) => result.toUpperCase();

  select: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term === '' ? [] : states.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
      ),
    );

  sourceControl = new FormControl('');
  franchiseControl = new FormControl('');
  startDate = new FormControl('');
  retrunDate = new FormControl('');
  options1: string[] = ['Chandigarh', 'Delhi', 'Mumbai', 'Austin', 'Dallas', 'Houston'];
  options2: string[] = ['Chandigarh', 'Delhi', 'Mumbai', 'Austin', 'Dallas', 'Houston'];
  sortOptions : string[] = ["Rating Low to High", "Rating High to Low"];
  franchises: string[] = [];
  filteredOptions1: Observable<string[]>;
  areHotelsAvailable: boolean = false;
  hotelRoomResponseList: Array<HotelRoomResponse>;
  hotelList: Array<HotelResponse>;
  filteredHotelList: Array<HotelResponse> = [];
  hotelSearchResponse: HotelSearchResponse;
  hotelSearchRequest: HotelSearchRequest;
  numberOfDays: any;
  id : any;

  selected1: any;
  selected2: any;

  constructor(public hotelSearchService: HotelSearchService, public router: Router) { }

  ngOnInit() {
    this.filteredOptions1 = this.sourceControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter1(value || '')),
    );
  }

  displayedColumns: any[] = ['flight_number', 'Airline', 'flight_type', 'source', 'destination', 'arrival_time', 'depart_time', 'rating', 'cost', 'button'];
  search() {
    console.log(this.sourceControl.value);
    console.log(this.startDate.value);
    console.log(this.retrunDate.value);
    this.hotelSearchRequest = new HotelSearchRequest(this.sourceControl.value, "", new Date(this.startDate.value+" "), new Date(this.retrunDate.value+ " "));
    this.hotelSearchService.getHotels(this.hotelSearchRequest).subscribe(response => {
      this.hotelSearchResponse = response;
      console.log(this.hotelSearchResponse);
      if (this.hotelSearchResponse == null) {
        this.areHotelsAvailable = false;
      } else {
        this.hotelList = this.hotelSearchResponse.hotelResponseList;
        this.filteredHotelList = this.hotelList;
        this.numberOfDays = this.hotelSearchResponse.numberOfDays;
        this.areHotelsAvailable = true;
        this.franchiseList();
      }
    });
  }

  filterFranchise(value) {
    console.log("filter");
    console.log(value);
    console.log(this.selected2)
    if(value != null){
      this.filteredHotelList = this.hotelList.filter(hotel => hotel.franchiseName == value);
    } else{
      this.filteredHotelList = this.hotelList;
    }
    if (this.selected2 == "Rating Low to High") {
      this.filteredHotelList = this.filteredHotelList.sort((a, b) => a.rating - b.rating);
    } else if(this.selected2 == "Rating High to Low") {
      this.filteredHotelList = this.filteredHotelList.sort((a, b) => b.rating - a.rating);
    }
  }

  sortHotels(value) {
    console.log("sort");
    console.log(value);
    console.log(this.selected1);
    if(this.selected1 != null){
      this.filteredHotelList = this.hotelList.filter(hotel => hotel.franchiseName == this.selected1);
    } else{
      this.filteredHotelList = this.hotelList;
    }
    if (value == "Rating Low to High") {
      this.filteredHotelList = this.filteredHotelList.sort((a, b) => a.rating - b.rating);
    } else if(value == "Rating High to Low") {
      this.filteredHotelList = this.filteredHotelList.sort((a, b) => b.rating - a.rating);
    }
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

  btnClick(value: string) {
    sessionStorage.setItem("hotelRoomId", value);
    sessionStorage.setItem("hotelcheckInDate", this.startDate.value);
    sessionStorage.setItem("hotelcheckOutDate", this.retrunDate.value);
    sessionStorage.setItem("hotelCheckInDays", this.numberOfDays);
    this.id = sessionStorage.getItem('id');
    if(this.id == null){
      this.router.navigate(['/login']);
    } else{
      this.router.navigate(['/checkout']);
    }
  }

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options1.filter(option => option.toLowerCase().includes(filterValue));
  }
}
