import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancestaffComponent } from './insurancestaff.component';

describe('InsurancestaffComponent', () => {
  let component: InsurancestaffComponent;
  let fixture: ComponentFixture<InsurancestaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsurancestaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancestaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
