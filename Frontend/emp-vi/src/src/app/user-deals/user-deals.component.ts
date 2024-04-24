import { Component, OnInit } from '@angular/core';

import { PromoResponse } from 'src/app/model/promo-response.model';
import { PromoSearchResponse } from 'src/app/model/promo-list-response.model';
import { PromoSearchRequest } from 'src/app/model/promo-code-search-request.model';
import { PromoService } from '../services/promo-service/promo-service-search';

@Component({
  selector: 'app-user-deals',
  templateUrl: './user-deals.component.html',
  styleUrls: ['./user-deals.component.css']
})
export class UserDealsComponent implements OnInit {

  promoRequest : PromoSearchRequest;
  promoResponse : PromoResponse;
  promoList : PromoSearchResponse;

  userPromoList : Array<PromoResponse>;

  promosAvailable : boolean = false;

  userId : any;
  

  constructor(public promoService : PromoService) {
    this.userId = sessionStorage.getItem("id");
    promoService.getAllPromos(this.userId).subscribe(response =>{
      this.userPromoList = response;
      if(this.userPromoList == null || this.userPromoList.length == 0){
        this.promosAvailable = false;
      } else{
        this.promosAvailable = true;
      }
    })
  }

  ngOnInit(): void {
  }

}
