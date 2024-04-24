import { FlightResponse } from "./flight-response.model";
import { HotelResponse } from "./hotel-response.model";
import { UserProfile } from "./UserProfile.model";

export class TransactionResponse{
    transactionId : number;
    userProfileResponse : UserProfile;
    totalCost : number;
    tax : number;
    numberOfPassengers : number;
    returnPassengers : number;
    hotelRooms : number;
    hotelCheckInDate : any;
    hotelCheckOutDate : any;
    hotelNumberOfDays : number;
    totalCostPaid : number;
    flight : boolean;
    returnFlight : boolean;
    hotel : boolean;
    flightResponse : FlightResponse;
    transactionDate: Date;
    returnFlightResponse : FlightResponse;
    hotelResponse : HotelResponse

    constructor(transactionId, userProfileResponse, totalCost, tax, numberOfPassengers, returnPassengers, hotelRooms, hotelCheckInDate, hotelCheckOutDate, hotelNumberOfDays, totalCostPaid, isFlight, isReturnFlight, isHotel, flightResponse, transactionDate, returnFlightResponse, hotelResponse){
        this.transactionId = transactionId;
        this.userProfileResponse = userProfileResponse;
        this.totalCost = totalCost;
        this.tax =  tax;
        this.numberOfPassengers = numberOfPassengers;
        this.returnPassengers = returnPassengers;
        this.hotelRooms = hotelRooms;
        this.hotelCheckInDate = hotelCheckInDate;
        this.hotelCheckOutDate = hotelCheckOutDate;
        this.hotelNumberOfDays = hotelNumberOfDays;
        this.totalCostPaid = totalCostPaid;
        this.flight = isFlight;
        this.returnFlight = isReturnFlight;
        this.hotel = isHotel;
        this.flightResponse = flightResponse;
        this.transactionDate = transactionDate;
        this.returnFlightResponse = returnFlightResponse;
        this.hotelResponse = hotelResponse;
    }
}