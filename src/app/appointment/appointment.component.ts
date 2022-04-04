import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CreateAppointmentComponent } from '../create-appointment/create-appointment.component';
import { ViewAppointmentComponent } from '../view-appointment/view-appointment.component';
import { TokenStorageService } from '../services/token-storage.service';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {

  @ViewChild(CreateAppointmentComponent) private createAppointmentComponent:any;
  @ViewChild(ViewAppointmentComponent) private viewAppointmentComponent:any;
  showPendingAppointments=false;
  constructor(private tokenStorageService:TokenStorageService) {}

  ngOnInit(): void {
    if(this.tokenStorageService.getUser().roles.includes('ROLE_ADMIN') || this.tokenStorageService.getUser().roles.includes('ROLE_HOSPITALSTAFF') || this.tokenStorageService.getUser().roles.includes('ROLE_DOCTOR')){
      this.showPendingAppointments = true;
    }
  }

  onTabChanged(event: MatTabChangeEvent) 
  {
    if(event.index == 0)
    {
        this.createAppointmentComponent.refresh();//Or whatever name the method is called
    }
    else
    {
        this.viewAppointmentComponent.refresh(); //Or whatever name the method is called
    }
  }
}
