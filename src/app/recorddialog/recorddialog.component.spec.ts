import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecorddialogComponent } from './recorddialog.component';

describe('RecorddialogComponent', () => {
  let component: RecorddialogComponent;
  let fixture: ComponentFixture<RecorddialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecorddialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecorddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
