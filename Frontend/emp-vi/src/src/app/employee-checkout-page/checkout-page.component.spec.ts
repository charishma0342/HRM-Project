import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCheckoutPageComponent } from './checkout-page.component';

describe('EmployeeCheckoutPageComponent', () => {
  let component: EmployeeCheckoutPageComponent;
  let fixture: ComponentFixture<EmployeeCheckoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeCheckoutPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCheckoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
