import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightSearchComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { EmployeeCheckoutPageComponent } from './employee-checkout-page/employee-checkout-page.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { UserPaymentPageComponent } from './user-payment-page/user-payment-page.component';
import { HotelsSearchComponent } from './hotels-search/hotels-search.component';
import { AssignmentHistoryComponent } from './assignment-history/assignment-history.component';
import { FlightsHotelsComponent } from './flights-hotels/flights-hotels.component';
import { TravelHomeComponent } from './travel-home/travel-home.component';
import { AssignmentComponent } from './assignment-search/assignment-search.component';
import { AssignmentCartComponent } from './assignment-cart/assignment-cart.component';
import { UserDealsComponent } from './user-deals/user-deals.component';
import { EmployeeStatusComponent } from './employee-status/employee-status.component';
import { UserFeedbackComponent } from './user-feedback/user-feedback.component';

const routes: Routes = [
  {path : "" , redirectTo : "login", pathMatch : "full"},
  {path : "login", component : LoginPageComponent},
  {path : "project", component : HotelsSearchComponent},
  {path : "checkout", component : EmployeeCheckoutPageComponent},
  {path : "profile", component : UserProfilePageComponent},
  {path : "payment-methods", component : UserPaymentPageComponent},
  {path : "register", component : RegistrationPageComponent},
  {path : "history", component : AssignmentHistoryComponent},
  {path : "flighthotel", component : FlightsHotelsComponent},
  {path : "home", component : TravelHomeComponent},
  {path : "employee", component : FlightSearchComponent},
  {path : "deals" , component : AssignmentComponent},
  {path : "deals-cart", component : AssignmentCartComponent},
  {path : "flight-status", component : EmployeeStatusComponent},
  {path : "feedback", component : UserFeedbackComponent},
  {path : "user-deals", component : UserDealsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
