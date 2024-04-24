import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentCartComponent } from './assignment-cart.component';

describe('AssignmentCartComponent', () => {
  let component: AssignmentCartComponent;
  let fixture: ComponentFixture<AssignmentCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
