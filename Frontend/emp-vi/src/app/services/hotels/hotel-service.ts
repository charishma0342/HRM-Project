import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HotelResponse } from 'src/app/model/hotel-response.model';
import { HotelSearchRequest } from 'src/app/model/hotel-search-request.model';
import { HotelSearchResponse } from 'src/app/model/hotel-search-response.model';


const API_URL = "http://localhost:8081/hotels";

@Injectable({
  providedIn: 'root'
})
export class HotelSearchService {
  constructor(public http : HttpClient) { }
  
  getHotels(hotelSearchRequest: HotelSearchRequest) : any{
    console.log(hotelSearchRequest)
    return this.http.post<HotelSearchResponse>(API_URL+"/search", hotelSearchRequest);
  }
  addReview(pro: any) {
    return this.http.post("http://localhost:8088/user/add/review",pro);
  }

  updateProjects(a: any) : any{
    
    return this.http.post("http://localhost:8088/user/get/update/project", a);
  }

  getProjects(ab: any) : any{
    let a : any ={
      client: ab
    }
    return this.http.post("http://localhost:8088/project/get/all/projects/client",a);
  }

  getHotelDetails(hotelRoomId : number) : any{
    console.log(hotelRoomId);
    return this.http.get<HotelResponse>(API_URL+"/"+hotelRoomId);
  }
  getAllProjects() : any{

    return this.http.get("http://localhost:8088/project/get/all/projects");
  }
}

