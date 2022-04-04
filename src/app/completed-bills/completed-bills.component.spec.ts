import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedBillsComponent } from './completed-bills.component';

describe('CompletedBillsComponent', () => {
  let component: CompletedBillsComponent;
  let fixture: ComponentFixture<CompletedBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedBillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
