import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementDetailsComponent } from './payement-details.component';

describe('PayementDetailsComponent', () => {
  let component: PayementDetailsComponent;
  let fixture: ComponentFixture<PayementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayementDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
