import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../services/user-profile/user-profile.service';
import { UserProfile } from '../model/UserProfile.model';

import { Router } from '@angular/router';

import { PromoResponse } from 'src/app/model/promo-response.model';
import { PromoSearchResponse } from 'src/app/model/promo-list-response.model';
import { PromoSearchRequest } from 'src/app/model/promo-code-search-request.model';
import { PromoService } from '../services/promo-service/promo-service-search';
import { AddPromoRequest } from '../model/add-promo-request.model';

@Component({
  selector: 'assignment-cart',
  templateUrl: './assignment-cart.component.html',
  styleUrls: ['./assignment-cart.component.css']
})
export class AssignmentCartComponent implements OnInit {

  id: string;
  profileDetails: UserProfile;
  isUserExists: boolean = false;
  userBonus: number;

  assignmentRequest: PromoSearchRequest;
  assignmentResponse: PromoResponse;
  assignmentList: PromoSearchResponse;
  assignmentId: any;

  userAssignmentList : Array<PromoResponse>;

  isDifferable : boolean = false;

  count: number = 0;
  totalCost : number = 0;
  finalCost : number = 0;
  tax : number = 0;
  isAssignmentPresent: boolean = false;

  addPromoRequest : AddPromoRequest;

  constructor(public profileService: UserProfileService, public promoService: PromoService, public router : Router) {
    this.id = sessionStorage.getItem('id');
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
    this.assignmentId = sessionStorage.getItem("assignmentId");
    if (this.assignmentId != null) {
      promoService.getPromoDetails(this.assignmentId).subscribe(response => {
        console.log(response);
        this.assignmentResponse = response;
        if (this.assignmentResponse != null) {
          if(this.isUserExists && this.userBonus>this.assignmentResponse.mileage){
            this.isDifferable = true;
            console.log(this.isDifferable);
          }
          this.totalCost = this.assignmentResponse.price;
          this.tax = this.totalCost * 0.15;
          this.finalCost = this.totalCost+this.tax;
          this.isAssignmentPresent = true;
          this.count++;
        }
      })
    }
    if(this.assignmentResponse != null && this.isUserExists && this.userBonus>this.assignmentResponse.mileage){
      this.isDifferable = true;
      console.log(this.isDifferable);
    }
    if(this.assignmentResponse != null && this.isUserExists && this.userBonus>this.assignmentResponse.mileage){
      this.isDifferable = true;
      console.log(this.isDifferable);
    }
    if(this.assignmentResponse != null && this.isUserExists && this.userBonus>this.assignmentResponse.mileage){
      this.isDifferable = true;
      console.log(this.isDifferable);
    }
  }

  redeem(){
    console.log(this.profileDetails.id);
    console.log(this.assignmentId);
    console.log("redeem")
    this.addPromoRequest = new AddPromoRequest(this.profileDetails.id, this.assignmentId, "redeem");
    this.promoService.addPromo(this.addPromoRequest).subscribe(response => {
      console.log(response);
      this.userAssignmentList = response;
      this.router.navigate(['/home']);
    })
  }

  submit(){
    console.log(this.profileDetails.id);
    console.log(this.assignmentId);
    console.log("card")
    this.addPromoRequest = new AddPromoRequest(this.profileDetails.id, this.assignmentId, "card");
    this.promoService.addPromo(this.addPromoRequest).subscribe(response => {
      console.log(response);
      this.userAssignmentList = response;
      this.router.navigate(['/home']);
    })
  }

  ngOnInit(): void {
  }

}
