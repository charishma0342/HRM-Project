import { Time } from "@angular/common";

export class FlightResponse{
    flightScheduleId : number;
    price : number;
    flightNumber : string;
    airlinesName : string;
    flightType : String;
    flightRating : number;
    sourceCity : string;
    destinationCity : string;
    logo : string;
    startDate : Date;
    endDate : Date;
    startTime : Time;
    endTime : Time;
    miles : number;
    flightReference : string;

    constructor(id, flightNumber, airlinesName, flightType, flightRating, sourceCity, destinationCity, price, startDate, endDate, startTime, endTime, logo, miles, flightReference){
        this.flightScheduleId = id;
        this.flightNumber = flightNumber;
        this.airlinesName = airlinesName;
        this.flightType = flightType;
        this.flightRating =  flightRating;
        this.sourceCity = sourceCity;
        this.destinationCity = destinationCity;
        this.price = price;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.logo = logo;
        this.miles = miles;
        this.flightReference = flightReference;
    }
}