import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth2fComponent } from './auth2f.component';

describe('Auth2fComponent', () => {
  let component: Auth2fComponent;
  let fixture: ComponentFixture<Auth2fComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Auth2fComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth2fComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
