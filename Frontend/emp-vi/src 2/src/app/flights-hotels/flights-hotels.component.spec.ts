import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsHotelsComponent } from './flights-hotels.component';

describe('FlightsHotelsComponent', () => {
  let component: FlightsHotelsComponent;
  let fixture: ComponentFixture<FlightsHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightsHotelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
