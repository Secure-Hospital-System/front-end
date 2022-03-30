import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth2fRegistrationComponent } from './auth2f-registration.component';

describe('Auth2fRegistrationComponent', () => {
  let component: Auth2fRegistrationComponent;
  let fixture: ComponentFixture<Auth2fRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Auth2fRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth2fRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
