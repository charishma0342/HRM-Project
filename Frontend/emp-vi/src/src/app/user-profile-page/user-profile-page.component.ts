import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../model/UserProfile.model';
import { UserProfileService } from '../services/user-profile/user-profile.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit {
  id : string;
  profileDetails : UserProfile;
  isUserExists : boolean = false;


  constructor(public profileService : UserProfileService) { }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('id');
    this.profileService.getProfileDetails(this.id).subscribe(response =>{
      this.profileDetails = response;
        console.log(this.profileDetails);
        if(this.profileDetails == null){
          this.isUserExists = false;
        }else{
          this.isUserExists = true;
        }
      });
  }

}
