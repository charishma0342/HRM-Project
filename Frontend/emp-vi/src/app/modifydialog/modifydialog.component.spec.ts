import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifydialogComponent } from './modifydialog.component';

describe('ModifydialogComponent', () => {
  let component: ModifydialogComponent;
  let fixture: ComponentFixture<ModifydialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifydialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
