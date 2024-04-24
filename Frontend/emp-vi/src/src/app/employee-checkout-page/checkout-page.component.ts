import { Component, OnInit } from '@angular/core';
import { FlightResponse } from '../model/flight-response.model';
import { FlightSearchService } from '../services/flight-search/flight-search-service';
import { Router } from '@angular/router';
import { TransactionRequest } from '../model/transaction-request.model';
import { TransactionServie } from '../services/transaction/transaction-service';
import { HotelSearchRequest } from '../model/hotel-search-request.model';
import { HotelSearchService } from '../services/hotels/hotel-service';
import { HotelRoomResponse } from '../model/hotel-room-response.model';
import { HotelResponse } from '../model/hotel-response.model';
import { HotelSearchResponse } from '../model/hotel-search-response.model';
import { UserProfile } from '../model/UserProfile.model';
import { UserProfileService } from '../services/user-profile/user-profile.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppliedPromoResponse } from '../model/applied-promo-response.model';
import { ApplyPromoRequest } from '../model/apply-promo-request.model';
import { PromoService } from '../services/promo-service/promo-service-search';
import { UserPaymentMethods } from '../model/user-payment-methods.model';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class EmployeeCheckoutPageComponent implements OnInit {


  myFormGroup : FormGroup;
  promoApplied : any;

  isPromoEntered : boolean = false;
  isPromoValid : boolean = false;

  offerPrice : number = 0;
  promoId : number;
  promoName : string;

  addPromoRequest : ApplyPromoRequest;
  appliedPromo : AppliedPromoResponse;



  passengerCount: number = 0;
  returnPassengerCount: number = 0;
  hotelRoomsCount: number = 0;
  flightResponse: FlightResponse;
  returnlightResponse: FlightResponse;
  hotelResponse: HotelResponse;
  flightNumber: String;
  flightSource: String;
  flightDestination: String;
  flightId: any;
  returnFlightId: any;
  flightIdList: Array<String>;
  hotelId: any;
  hotelCheckInDate: string;
  hotelCheckOutDate: string;
  hotelCheckInDays: any;
  flightPresent: Boolean = false;
  returnFlightPresent: Boolean = false;
  hotelPresent: Boolean = false;
  totalPrice: number = 0;
  tax: number = 0;
  count: number = 0;
  userId: any;
  flightTicketPrice: number;
  returnFlightTicketPrice: number;
  hotelRoomPrice: number;

  offerDiscount: Boolean = false;
  discountedPrice: number = 0;

  id: string;
  profileDetails: UserProfile;
  isUserExists: boolean = false;

  isReedemable: boolean = false;
  redeemedPrice: number = 0;
  userMileage: number;
  isReedemed: boolean = false;
  numberOfTicketsRedeemed: number = 0;

  finalPrice: number = 0;

  messageSuccess : boolean = false;

  userPaymentMethods : Array<UserPaymentMethods>;
  paymentMethodChosen : any;


  constructor(formbuilder : FormBuilder,public profileService: UserProfileService, public flightSearchService: FlightSearchService, public hotelSearchService: HotelSearchService, public router: Router, public transactionService: TransactionServie, public promoService : PromoService) {


    this.myFormGroup=formbuilder.group({
      "promoCode" : new FormControl("")
    })


    this.id = sessionStorage.getItem('id');
    profileService.getPaymentMethods(this.id).subscribe(response => {
      console.log(response);
      this.userPaymentMethods = response;
      console.log(this.userPaymentMethods);
    })
    this.profileService.getProfileDetails(this.id).subscribe(response => {
      this.profileDetails = response;
      console.log(this.profileDetails);
      if (this.profileDetails == null) {
        this.isUserExists = false;
      } else {
        this.isUserExists = true;
        this.userMileage = this.profileDetails.travelMileage;
      }
    });
    this.flightId = sessionStorage.getItem("travelFlightId");
    if (this.flightId != null) {
      this.flightPresent = true;
      this.passengerCount = 1;
      this.count++;
      this.flightSearchService.getFlightDetails(this.flightId).subscribe(response => {
        console.log(response);
        this.flightResponse = response;
        console.log(this.userMileage);
        if ((this.flightResponse.flightType == "Domestic" && this.userMileage >= 25000) || (this.flightResponse.flightType == "International" && this.userMileage >= 50000)) {
          this.isReedemable = true;
        }
        console.log('isredeeamable');
        console.log(this.isReedemable);
        this.flightTicketPrice = this.flightResponse.price * this.passengerCount;
        this.totalPrice += this.flightTicketPrice;
        this.tax = this.totalPrice * 0.15;

        this.calculateDiscount();
      });
    }
    if(this.flightResponse != null){
      if ((this.flightResponse.flightType == "Domestic" && this.userMileage >= 25000) || (this.flightResponse.flightType == "International" && this.userMileage >= 50000)) {
        this.isReedemable = true;
      }
    }
    this.returnFlightId = sessionStorage.getItem("retrunFlightId");
    if (this.returnFlightId != null) {
      this.returnFlightPresent = true;
      this.returnPassengerCount = 1;
      this.count++;
      this.flightSearchService.getFlightDetails(this.returnFlightId).subscribe(response => {
        this.returnlightResponse = response;
        this.returnFlightTicketPrice = this.returnlightResponse.price * this.returnPassengerCount;
        this.totalPrice += this.returnFlightTicketPrice;
        this.tax = this.totalPrice * 0.15;
        this.calculateDiscount();
      });
    }
    if(this.flightResponse != null){
      if ((this.flightResponse.flightType == "Domestic" && this.userMileage >= 25000) || (this.flightResponse.flightType == "International" && this.userMileage >= 50000)) {
        this.isReedemable = true;
      }
    }
    this.hotelId = sessionStorage.getItem("hotelRoomId");
    if (this.hotelId != null) {
      this.hotelCheckInDate = sessionStorage.getItem("hotelcheckInDate");
      this.hotelCheckOutDate = sessionStorage.getItem("hotelcheckOutDate");
      this.hotelCheckInDays = sessionStorage.getItem("hotelCheckInDays");
      this.hotelPresent = true;
      this.hotelRoomsCount = 1;
      this.count++;
      this.hotelSearchService.getHotelDetails(this.hotelId).subscribe(response => {
        this.hotelResponse = response;
        this.hotelRoomPrice = this.hotelResponse.hotelRoomsList[0].price * this.hotelRoomsCount * this.hotelCheckInDays;
        this.totalPrice += this.hotelRoomPrice;
        this.tax = this.totalPrice * 0.15;
        this.calculateDiscount();
      });
    }
    if(this.flightResponse != null){
      if ((this.flightResponse.flightType == "Domestic" && this.userMileage >= 25000) || (this.flightResponse.flightType == "International" && this.userMileage >= 50000)) {
        this.isReedemable = true;
      }
    }

  }

  calculateDiscount() {
    if (this.hotelId != null && this.flightId != null) {
      console.log("the discount is applicable");
      this.offerDiscount = true;
      console.log(this.totalPrice);
      this.discountedPrice = (this.totalPrice - this.redeemedPrice - this.offerPrice) * 0.20;
      this.discountedPrice = parseFloat(this.discountedPrice.toFixed(2));
    }
    this.tax = (this.totalPrice - this.discountedPrice - this.redeemedPrice - this.offerPrice) * 0.15;
    this.tax = parseFloat(this.tax.toFixed(2))
    this.finalPrice = this.totalPrice + this.tax - this.discountedPrice - this.redeemedPrice - this.offerPrice;
    this.finalPrice = parseFloat(this.finalPrice.toFixed(2));
  }

  passengerSubmit() {
    if (this.passengerCount != null) {
      console.log("passengers:", this.passengerCount);
      this.totalPrice -= this.flightTicketPrice;
      this.flightTicketPrice = this.flightResponse.price * this.passengerCount;
      this.totalPrice += this.flightTicketPrice;
      this.tax = this.totalPrice * 0.15;
      this.calculateDiscount();
    }
  }

  returnPassengerSubmit() {
    if (this.returnPassengerCount != null) {
      console.log("Return passengers:", this.returnPassengerCount);
      this.totalPrice -= this.returnFlightTicketPrice;
      this.returnFlightTicketPrice = this.returnlightResponse.price * this.returnPassengerCount;
      this.totalPrice += this.returnFlightTicketPrice;
      this.tax = this.totalPrice * 0.15;
      this.calculateDiscount();
    }
  }

  hotelPassengerSubmit() {
    if (this.hotelRoomsCount != null) {
      console.log("Hotel passengers:", this.hotelRoomsCount);
      this.totalPrice -= this.hotelRoomPrice;
      this.hotelRoomPrice = this.hotelResponse.hotelRoomsList[0].price * this.hotelRoomsCount * this.hotelCheckInDays;
      this.totalPrice += this.hotelRoomPrice;
      this.tax = this.totalPrice * 0.15;
      this.calculateDiscount();
    }
  }

  submit() {
    this.userId = sessionStorage.getItem('id');
    let transactionRequest = new TransactionRequest(this.userId, this.flightId, this.passengerCount, this.returnFlightId, this.returnPassengerCount, this.hotelId, this.hotelRoomsCount, this.hotelCheckInDate, this.hotelCheckOutDate, this.totalPrice, this.tax, this.promoId, this.finalPrice, this.userMileage, this.discountedPrice, this.redeemedPrice, this.offerPrice, this.paymentMethodChosen);
    this.transactionService.postTransactions(transactionRequest).subscribe((successData) => {
      this.router.navigate(['/home']);
      sessionStorage.removeItem("travelFlightId");
      sessionStorage.removeItem("retrunFlightId");
      sessionStorage.removeItem("hotelRoomId");
      sessionStorage.removeItem("hotelcheckInDate");
      sessionStorage.removeItem("hotelcheckOutDate");
      console.log(successData)
    });
  }

  redeem() {
    this.isReedemed = true;
    console.log("77789");
    if (this.flightResponse.flightType == "Domestic") {
      this.numberOfTicketsRedeemed = Math.floor(this.userMileage / 25000);
      console.log("number of tickets");
      console.log(this.numberOfTicketsRedeemed);
      // this.userMileage = this.userMileage - (this.numberOfTicketsRedeemed * 25000);
    }
    if (this.flightResponse.flightType == "International") {
      this.numberOfTicketsRedeemed = Math.floor(this.userMileage / 50000);
      console.log("number of tickets");
      console.log(this.numberOfTicketsRedeemed);
      // this.userMileage = this.userMileage - (this.numberOfTicketsRedeemed * 50000);
    }
    if (this.returnlightResponse == null) {
      this.redeemedPrice = this.numberOfTicketsRedeemed * this.flightResponse.price;
      if(this.redeemedPrice > this.flightTicketPrice){
        this.redeemedPrice = this.flightTicketPrice;
        this.numberOfTicketsRedeemed = Math.floor(this.redeemedPrice/this.flightResponse.price);
      }
    }
    else {
      if (this.flightResponse.price < this.returnlightResponse.price) {
        this.redeemedPrice = this.numberOfTicketsRedeemed * this.returnlightResponse.price;
        if(this.redeemedPrice > this.returnFlightTicketPrice){
          this.redeemedPrice = this.returnFlightTicketPrice;
          this.numberOfTicketsRedeemed = Math.floor(this.redeemedPrice/this.returnlightResponse.price);
        }
      } else {
        this.redeemedPrice = this.numberOfTicketsRedeemed * this.flightResponse.price;
        if(this.redeemedPrice > this.flightTicketPrice){
          this.redeemedPrice = this.flightTicketPrice;
          this.numberOfTicketsRedeemed = Math.floor(this.redeemedPrice/this.flightResponse.price);
        }
      }
    }
    if(this.flightResponse.flightType == "Domestic"){
      this.userMileage = this.userMileage - (this.numberOfTicketsRedeemed * 25000);
    }
    if(this.flightResponse.flightType == "International"){
      this.userMileage = this.userMileage - (this.numberOfTicketsRedeemed * 50000);
    }
    this.isReedemable = false;
    this.calculateDiscount();
  }

  apply(){
    this.userId = sessionStorage.getItem('id');
    this.isPromoEntered = true;
    this.promoApplied = this.myFormGroup.controls['promoCode'].value;
    console.log(this.promoApplied);
    this.addPromoRequest = new ApplyPromoRequest(this.promoApplied,this.totalPrice,this.userId);
    this.promoService.applyPromo(this.addPromoRequest).subscribe(response =>{
      this.appliedPromo = response;
      if(this.appliedPromo != null && this.appliedPromo.valid){
        this.isPromoValid = true;
        this.promoName = this.appliedPromo.promoName;
        this.promoId = this.appliedPromo.promoId;
        this.offerPrice = this.appliedPromo.offeredDiscount;
        this.tax = (this.totalPrice - this.discountedPrice - this.redeemedPrice - this.offerPrice) * 0.15;
        this.finalPrice = this.totalPrice + this.tax - this.discountedPrice - this.redeemedPrice - this.offerPrice;
        this.calculateDiscount();
      }
    })
  }

  selectPayment(value){
    console.log(value);
    this.paymentMethodChosen = value;
    console.log(this.paymentMethodChosen);
  }


  ngOnInit(): void {
  }

}
