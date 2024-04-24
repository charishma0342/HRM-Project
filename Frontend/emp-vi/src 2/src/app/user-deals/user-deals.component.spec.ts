import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDealsComponent } from './user-deals.component';

describe('UserDealsComponent', () => {
  let component: UserDealsComponent;
  let fixture: ComponentFixture<UserDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDealsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
