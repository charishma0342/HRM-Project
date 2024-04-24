import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeCheckoutPageComponent } from '../employee-checkout-page/employee-checkout-page.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HotelSearchService } from '../services/hotels/hotel-service';
@Component({
  selector: 'app-modifydialog',
  templateUrl: './modifydialog.component.html',
  styleUrls: ['./modifydialog.component.css']
})

export class ModifydialogComponent implements OnInit {
  a: string;
  b: string;
  filteredOptions1: ['a', 'b'];
  filteredOptions2: ['c', 'd'];
  selected1: string;
  selected2: string;
  data2: any;
  req: any;
  abc: abc[];
  review: string ="";
  rating: number;
  sourceControl = new FormControl('');
  destinationControl = new FormControl('');
  constructor(public dialogRef: MatDialogRef<EmployeeCheckoutPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public hotelSearchService: HotelSearchService) { }

  ngOnInit(): void {
    this.hotelSearchService.getAllProjects().subscribe(response => {
      this.data2 = response;
      console.log(response);
    });
    for (let val of this.data2) {
      let x = {
        value: val.projectId, viewValue: val.projectName
      }
      this.abc.push(x);

    }
    console.log(this.abc);
    console.log(this.data.case);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  assign() {
    let x = sessionStorage.getItem("travelFlightId");
     let y = parseInt(x);
    let b: any = {
      employeeId: y,
      projectId: this.selected2,
      mode: "add"

    }
    console.log(this.abc);
    console.log(this.data.case);
    this.hotelSearchService.updateProjects(b).subscribe(response => { console.log(response); });
    this.dialogRef.close();
  }
  addReview() {
    let x = sessionStorage.getItem("travelFlightId");
    this.req = {
      employeeId: parseInt(x),
      review: this.review,
     projectId: 123,
      rating: this.rating
    }
    console.log(this.req);
    this.hotelSearchService.addReview(this.req).subscribe(response => { console.log(response); }); 
    this.dialogRef.close();
  }
  public onValueChange(event: Event): void {
    //console.log(event.target);
    const value = (event.target as any).value;
    this.review = value;
  }

}

interface abc {
  value: string;
  viewValue: string;
}

