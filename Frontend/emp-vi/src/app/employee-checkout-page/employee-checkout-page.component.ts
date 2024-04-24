import { Component, OnInit } from '@angular/core';
import { FlightSearchService } from '../services/flight-search/flight-search-service';
import { Router } from '@angular/router';
import { TransactionServie } from '../services/transaction/transaction-service';
import { HotelSearchService } from '../services/hotels/hotel-service';
import { UserProfileService } from '../services/user-profile/user-profile.service';
import { FormBuilder } from '@angular/forms';
import { PromoService } from '../services/promo-service/promo-service-search';
import { MatDialog } from '@angular/material/dialog';
import { ModifydialogComponent } from '../modifydialog/modifydialog.component';
@Component({
  selector: 'app-checkout-page',
  templateUrl: './employee-checkout-page.component.html',
  styleUrls: ['./employee-checkout-page.component.css']
})
export class EmployeeCheckoutPageComponent implements OnInit {
user:any;
  user$: any = {
    firstName: "Raj",
    middleName: "Kumar",
    lastName: "Madala",
    emailId: "rajkumar123@gmail.com",
    phoneNumber: "5673458796",
    acquiredSkills: [
      "Java",
      "AngularJS",
      "ReactJS",
      "Python"
    ],
    joiningDate: "2013-01-01",
    exitDate: null,
    skillDomain: null,
    type: null,
    ctc: "10000",
    location: "New york",
    pastProjects: [
      {
        projectName: "Sales APP - EX-1",
        projectDescription: "A project of creating E-commerce application",
        goals: "1.Customer satisfaction \r\n2.Product classification\r\n3.After sales management",
        startDate: "2015-04-08",
        endDate: null,
        rating: 4,
        review: "wonderful employee"
      },
      {
        projectName: "Sales APP EX-2",
        projectDescription: "A project of creating E-commerce application",
        goals: "1.Customer satisfaction \r\n2.Product classification\r\n3.After sales management",
        startDate: "2015-04-08",
        endDate: null,
        rating: 4,
        review: "wonderful employee"
      }
    ],
    activeProjects: [
      {
        projectName: "Sales APP",
        projectDescription: "A project of creating E-commerce application",
        goals: "1.Customer satisfaction \r\n2.Product classification\r\n3.After sales management",
        startDate: "2015-04-08",
        endDate: null,
        rating: 4,
        review: "wonderful employee"
      }
    ],
    futureProjects: [],
    active: true
  };

  constructor(public dialog: MatDialog, formbuilder: FormBuilder, public profileService: UserProfileService, public flightSearchService: FlightSearchService, public hotelSearchService: HotelSearchService, public router: Router, public transactionService: TransactionServie, public promoService: PromoService) {
  }


  openDialog(input: any): void {
    const dialogRef = this.dialog.open(ModifydialogComponent, {
      data: { id: 'hello', case: input },
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   window.location.reload();
    // });
    dialogRef.afterClosed().subscribe(result => {
         console.log('The dialog was closed');
        window.location.reload();
       });

  }

  ngOnInit(): void {
    console.log(sessionStorage.getItem("travelFlightId"));
    let a = sessionStorage.getItem("travelFlightId");
    this.flightSearchService.getEmp(a).subscribe(response =>{
      this.user = response;
      console.log(response);
      });
  }

}
