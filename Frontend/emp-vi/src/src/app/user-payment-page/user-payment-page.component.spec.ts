import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPaymentPageComponent } from './user-payment-page.component';

describe('UserPaymentPageComponent', () => {
  let component: UserPaymentPageComponent;
  let fixture: ComponentFixture<UserPaymentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPaymentPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
