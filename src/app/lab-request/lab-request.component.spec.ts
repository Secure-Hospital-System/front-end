import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabRequestComponent } from './lab-request.component';

describe('LabRequestComponent', () => {
  let component: LabRequestComponent;
  let fixture: ComponentFixture<LabRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
