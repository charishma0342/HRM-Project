import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

import { PromoResponse } from 'src/app/model/promo-response.model';
import { PromoSearchResponse } from 'src/app/model/promo-list-response.model';
import { PromoSearchRequest } from 'src/app/model/promo-code-search-request.model';
import { PromoService } from '../services/promo-service/promo-service-search';

@Component({
  selector: 'assignment-search',
  templateUrl: './assignment-search.component.html',
  styleUrls: ['./assignment-search.component.css']
})
export class AssignmentComponent implements OnInit {


  locationControl = new FormControl('');
  skillControl = new FormControl('');
  assignmentDate = new FormControl('');
  releaseDate = new FormControl('');

  assignmentRequest : PromoSearchRequest;
  assignmentResponse : PromoResponse;
  assignmentList : PromoSearchResponse;

  assignmentAvailable : boolean = false;
  onSearchClick : boolean = false;

  options1: string[] = ['Chandigarh', 'Delhi', 'Mumbai', 'Austin', 'Dallas', 'Houston'];
  options2: string[] = ['Java', 'net', 'spring', 'Angular'];
  filteredOptions1: Observable<string[]>;
  filteredOptions2: Observable<string[]>;


  userId : string;


  constructor(public promoService : PromoService, public router : Router) { }

  search(){
    this.onSearchClick = true;
    console.log(this.locationControl.value);
    console.log(this.skillControl.value);
    console.log(this.assignmentDate.value);
    console.log(this.releaseDate.value);
    this.assignmentRequest = new PromoSearchRequest(this.locationControl.value, this.skillControl.value, this.assignmentDate.value, this.releaseDate.value, null, null);
    this.promoService.getPromos(this.assignmentRequest).subscribe(response => {
      console.log(response);
      this.assignmentList = response;
      console.log(this.assignmentList)
      if(this.assignmentList == null || this.assignmentList.promoCodeList == null || this.assignmentList.promoCodeList.length == 0){
         this.assignmentAvailable = false;
      } else{
        this.assignmentAvailable = true;
      }
    })
  }

  assign(value : string){
    console.log(value);
    sessionStorage.setItem("promoId",value);
    this.userId = sessionStorage.getItem("id");
    if(this.userId == null){
      this.router.navigate(['/login']);
    } else{
      this.router.navigate(['/assignment-cart']);
    }
  }

  ngOnInit(): void {
    this.filteredOptions1 = this.locationControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter1(value || '')),
    );
    this.filteredOptions2 = this.skillControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value || '')),
    );
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
