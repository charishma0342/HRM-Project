import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Email } from 'src/app/model/email.model';
import { UserModel } from 'src/app/model/UserModel.model';
import { UserRegistrationRequest } from '../model/user-registration-request.model';
import { UserAuthService } from '../services/user-login/user-auth.service';
import { FlightSearchService } from '../services/flight-search/flight-search-service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  @ViewChild('signUpForm') public buyerSignupForm: NgForm;
  name: string = '';
  forecast: number;
  teamLeaderId: number;
  buyermobile: number;
  date1: Date;
  date2: Date;
  buyers: any;
  clientName: string = '';
  goals: string = '';
  requiredSkills: string ='';
  description: string ='';
  constructor(protected service: FlightSearchService, protected router: Router) {
   }
  ngOnInit(): void {
  }
  addBuyer() {
    let buyer: Proj = {
      name: this.name,
      description: this.description,
      goals: this.goals,
      clientName: this.clientName,
      requiredSkills: this.requiredSkills,
      teamLeaderId: this.teamLeaderId,
      startDate:this.date1,
      endDate: this.date2,
      forecast: this.forecast,
      active: true,
      completed: false
    };
console.log(buyer);
    this.service.addProject(buyer).subscribe(
      (response: any) => {
      }
    );
    this.router.navigate(['/employee']);
  }
}

export interface Proj{
  name: string,
  description: string,
  goals: string,
  clientName: string,
  requiredSkills: string,
  teamLeaderId: number,
  startDate: Date,
  endDate: Date,
  forecast: number,
  active: boolean,
  completed: boolean
}