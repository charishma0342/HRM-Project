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
  templateUrl: './employee-checkout-page.component.html',
  styleUrls: ['./employee-checkout-page.component.css']
})
export class EmployeeCheckoutPageComponent implements OnInit {


  myFormGroup : FormGroup;
  assignmentApplied : any;

  isAssignemntEntered : boolean = false;
  isAssignemntValid : boolean = false;

  offerCost : number = 0;
  assignmentID : number;
  assignmentName : string;

  addAssignmentRequest : ApplyPromoRequest;
  appliedAssignment : AppliedPromoResponse;



  employeeCount: number = 0;
  releaseemployeeCount: number = 0;
  projectCount: number = 0;
  employeeResponse: FlightResponse;
  releaseEmpResponse: FlightResponse;
  projectResponse: HotelResponse;
  employeeNumber: String;
  employeeSource: String;
  employeeDestination: String;
  employeeId: any;
  releaseEmployeeId: any;
  employeeIdList: Array<String>;
  projectId: any;
  employeeAllocateDate: string;
  employeeDeallocateDate: string;
  projectAllocDays: any;
  employeePresent: Boolean = false;
  releaseEmployeePresent: Boolean = false;
  projectPresent: Boolean = false;
  totalCost: number = 0;
  tax: number = 0;
  count: number = 0;
  userId: any;
  employeeTicketPrice: number;
  releaseEmployeeTicketPrice: number;
  projectCost: number;

  oD: Boolean = false;
  dP: number = 0;

  id: string;
  profileDetails: UserProfile;
  isUserExists: boolean = false;

  isR: boolean = false;
  rP: number = 0;
  userBonus: number;
  isClaimed: boolean = false;
  numberO: number = 0;

  finalBillableCost: number = 0;

  messageSuccess : boolean = false;

  expense : Array<UserPaymentMethods>;
  expenseChosen : any;


  constructor(formbuilder : FormBuilder,public profileService: UserProfileService, public flightSearchService: FlightSearchService, public hotelSearchService: HotelSearchService, public router: Router, public transactionService: TransactionServie, public promoService : PromoService) {


    this.myFormGroup=formbuilder.group({
      "abc" : new FormControl("")
    })


    this.id = sessionStorage.getItem('id');
    profileService.getPaymentMethods(this.id).subscribe(response => {
      console.log(response);
      this.expense = response;
      console.log(this.expense);
    })
    this.profileService.getProfileDetails(this.id).subscribe(response => {
      this.profileDetails = response;
      console.log(this.profileDetails);
      if (this.profileDetails == null) {
        this.isUserExists = false;
      } else {
        this.isUserExists = true;
        this.userBonus = this.profileDetails.travelMileage;
      }
    });
    this.employeeId = sessionStorage.getItem("travelFlightId");
    if (this.employeeId != null) {
      this.employeePresent = true;
      this.employeeCount = 1;
      this.count++;
      this.flightSearchService.getFlightDetails(this.employeeId).subscribe(response => {
        console.log(response);
        this.employeeResponse = response;
        console.log(this.userBonus);
        if ((this.employeeResponse.flightType == "Domestic" && this.userBonus >= 25000) || (this.employeeResponse.flightType == "International" && this.userBonus >= 50000)) {
          this.isR = true;
        }
        console.log('isredeeamable');
        console.log(this.isR);
        this.employeeTicketPrice = this.employeeResponse.price * this.employeeCount;
        this.totalCost += this.employeeTicketPrice;
        this.tax = this.totalCost * 0.15;

        this.calculate();
      });
    }
    if(this.employeeResponse != null){
      if ((this.employeeResponse.flightType == "Domestic" && this.userBonus >= 25000) || (this.employeeResponse.flightType == "International" && this.userBonus >= 50000)) {
        this.isR = true;
      }
    }
    this.releaseEmployeeId = sessionStorage.getItem("retrunFlightId");
    if (this.releaseEmployeeId != null) {
      this.releaseEmployeePresent = true;
      this.releaseemployeeCount = 1;
      this.count++;
      this.flightSearchService.getFlightDetails(this.releaseEmployeeId).subscribe(response => {
        this.releaseEmpResponse = response;
        this.releaseEmployeeTicketPrice = this.releaseEmpResponse.price * this.releaseemployeeCount;
        this.totalCost += this.releaseEmployeeTicketPrice;
        this.tax = this.totalCost * 0.15;
        this.calculate();
      });
    }
    if(this.employeeResponse != null){
      if ((this.employeeResponse.flightType == "Domestic" && this.userBonus >= 25000) || (this.employeeResponse.flightType == "International" && this.userBonus >= 50000)) {
        this.isR = true;
      }
    }
    this.projectId = sessionStorage.getItem("hotelRoomId");
    if (this.projectId != null) {
      this.employeeAllocateDate = sessionStorage.getItem("hotelcheckInDate");
      this.employeeDeallocateDate = sessionStorage.getItem("hotelcheckOutDate");
      this.projectAllocDays = sessionStorage.getItem("projectAllocDays");
      this.projectPresent = true;
      this.projectCount = 1;
      this.count++;
      this.hotelSearchService.getHotelDetails(this.projectId).subscribe(response => {
        this.projectResponse = response;
        this.projectCost = this.projectResponse.hotelRoomsList[0].price * this.projectCount * this.projectAllocDays;
        this.totalCost += this.projectCost;
        this.tax = this.totalCost * 0.15;
        this.calculate();
      });
    }
    if(this.employeeResponse != null){
      if ((this.employeeResponse.flightType == "Domestic" && this.userBonus >= 25000) || (this.employeeResponse.flightType == "International" && this.userBonus >= 50000)) {
        this.isR = true;
      }
    }

  }

  calculate() {
    if (this.projectId != null && this.employeeId != null) {
      console.log("the discount is applicable");
      this.oD = true;
      console.log(this.totalCost);
      this.dP = (this.totalCost - this.rP - this.offerCost) * 0.20;
      this.dP = parseFloat(this.dP.toFixed(2));
    }
    this.tax = (this.totalCost - this.dP - this.rP - this.offerCost) * 0.15;
    this.tax = parseFloat(this.tax.toFixed(2))
    this.finalBillableCost = this.totalCost + this.tax - this.dP - this.rP - this.offerCost;
    this.finalBillableCost = parseFloat(this.finalBillableCost.toFixed(2));
  }

  eSubmit() {
    if (this.employeeCount != null) {
      console.log("passengers:", this.employeeCount);
      this.totalCost -= this.employeeTicketPrice;
      this.employeeTicketPrice = this.employeeResponse.price * this.employeeCount;
      this.totalCost += this.employeeTicketPrice;
      this.tax = this.totalCost * 0.15;
      this.calculate();
    }
  }

  relempSubmit() {
    if (this.releaseemployeeCount != null) {
      console.log("Return passengers:", this.releaseemployeeCount);
      this.totalCost -= this.releaseEmployeeTicketPrice;
      this.releaseEmployeeTicketPrice = this.releaseEmpResponse.price * this.releaseemployeeCount;
      this.totalCost += this.releaseEmployeeTicketPrice;
      this.tax = this.totalCost * 0.15;
      this.calculate();
    }
  }

  empSubmit() {
    if (this.projectCount != null) {
      console.log("Hotel passengers:", this.projectCount);
      this.totalCost -= this.projectCost;
      this.projectCost = this.projectResponse.hotelRoomsList[0].price * this.projectCount * this.projectAllocDays;
      this.totalCost += this.projectCost;
      this.tax = this.totalCost * 0.15;
      this.calculate();
    }
  }

  submit() {
    this.userId = sessionStorage.getItem('id');
    let transactionRequest = new TransactionRequest(this.userId, this.employeeId, this.employeeCount, this.releaseEmployeeId, this.releaseemployeeCount, this.projectId, this.projectCount, this.employeeAllocateDate, this.employeeDeallocateDate, this.totalCost, this.tax, this.assignmentID, this.finalBillableCost, this.userBonus, this.dP, this.rP, this.offerCost, this.expenseChosen);
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
    this.isClaimed = true;
    console.log("77789");
    if (this.employeeResponse.flightType == "Domestic") {
      this.numberO = Math.floor(this.userBonus / 25000);
      console.log("number of tickets");
      console.log(this.numberO);
      // this.userBonus = this.userBonus - (this.numberO * 25000);
    }
    if (this.employeeResponse.flightType == "International") {
      this.numberO = Math.floor(this.userBonus / 50000);
      console.log("number of tickets");
      console.log(this.numberO);
      // this.userBonus = this.userBonus - (this.numberO * 50000);
    }
    if (this.releaseEmpResponse == null) {
      this.rP = this.numberO * this.employeeResponse.price;
      if(this.rP > this.employeeTicketPrice){
        this.rP = this.employeeTicketPrice;
        this.numberO = Math.floor(this.rP/this.employeeResponse.price);
      }
    }
    else {
      if (this.employeeResponse.price < this.releaseEmpResponse.price) {
        this.rP = this.numberO * this.releaseEmpResponse.price;
        if(this.rP > this.releaseEmployeeTicketPrice){
          this.rP = this.releaseEmployeeTicketPrice;
          this.numberO = Math.floor(this.rP/this.releaseEmpResponse.price);
        }
      } else {
        this.rP = this.numberO * this.employeeResponse.price;
        if(this.rP > this.employeeTicketPrice){
          this.rP = this.employeeTicketPrice;
          this.numberO = Math.floor(this.rP/this.employeeResponse.price);
        }
      }
    }
    if(this.employeeResponse.flightType == "Domestic"){
      this.userBonus = this.userBonus - (this.numberO * 25000);
    }
    if(this.employeeResponse.flightType == "International"){
      this.userBonus = this.userBonus - (this.numberO * 50000);
    }
    this.isR = false;
    this.calculate();
  }

  apply(){
    this.userId = sessionStorage.getItem('id');
    this.isAssignemntEntered = true;
    this.assignmentApplied = this.myFormGroup.controls['promoCode'].value;
    console.log(this.assignmentApplied);
    this.addAssignmentRequest = new ApplyPromoRequest(this.assignmentApplied,this.totalCost,this.userId);
    this.promoService.applyPromo(this.addAssignmentRequest).subscribe(response =>{
      this.appliedAssignment = response;
      if(this.appliedAssignment != null && this.appliedAssignment.valid){
        this.isAssignemntValid = true;
        this.assignmentName = this.appliedAssignment.promoName;
        this.assignmentID = this.appliedAssignment.promoId;
        this.offerCost = this.appliedAssignment.offeredDiscount;
        this.tax = (this.totalCost - this.dP - this.rP - this.offerCost) * 0.15;
        this.finalBillableCost = this.totalCost + this.tax - this.dP - this.rP - this.offerCost;
        this.calculate();
      }
    })
  }

  select(value){
    console.log(value);
    this.expenseChosen = value;
    console.log(this.expenseChosen);
  }


  ngOnInit(): void {
  }

}
