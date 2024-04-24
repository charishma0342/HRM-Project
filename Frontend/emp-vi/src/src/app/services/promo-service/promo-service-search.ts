import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PromoResponse } from 'src/app/model/promo-response.model';
import { PromoSearchResponse } from 'src/app/model/promo-list-response.model';
import { PromoSearchRequest } from 'src/app/model/promo-code-search-request.model';
import { AddPromoRequest } from 'src/app/model/add-promo-request.model';
import { ApplyPromoRequest } from 'src/app/model/apply-promo-request.model';
import { AppliedPromoResponse } from 'src/app/model/applied-promo-response.model';


const API_URL = "http://localhost:8081/promo";

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  constructor(public http : HttpClient) { }
  
  getPromos(promoSearchRequest: PromoSearchRequest) : any{
    console.log(promoSearchRequest)
    return this.http.post<PromoSearchResponse>(API_URL+"/search", promoSearchRequest);
  }

  getPromoDetails(id : any) : any{
    console.log(id);
    return this.http.get<PromoResponse>(API_URL+"/"+id);
  }

  addPromo(addpromoRequest : AddPromoRequest) : any{
    console.log(addpromoRequest);
    return this.http.post<Array<PromoResponse>>(API_URL+"/"+"add", addpromoRequest);
  }

  getAllPromos(id : any) : any{
    console.log(id);
    return this.http.get<Array<PromoResponse>>(API_URL+"/user"+"/"+id);
  }

  applyPromo(request : ApplyPromoRequest) : any{
    console.log(request);
    return this.http.post<AppliedPromoResponse>(API_URL+"/apply",request)
  }

}