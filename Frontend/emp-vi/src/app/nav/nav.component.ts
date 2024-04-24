import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
   name : string;
   firstName : string;
   lastName : string;
   userId: string;
   loggedIn: boolean;
  constructor() {}
  
  logout(){
    console.log("logout called!")
    sessionStorage.clear();
  }
  ngOnInit(): void {
   //localStorage.setItem('abc', 'charishma');
  //  this.name = localStorage.getItem('abc');
  this.firstName = sessionStorage.getItem('firstName');
  this.lastName = sessionStorage.getItem('lastName');
   this.name = this.firstName+ " " + this.lastName;
   this.userId = sessionStorage.getItem('id');
   if(this.userId == null || this.userId.length == 0){
   this.loggedIn=true
   }
   else{
    this.loggedIn=false;
   }

  }

}
