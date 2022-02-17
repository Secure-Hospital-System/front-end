import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css'],
})

export class CreateAppointmentComponent implements OnInit {

  // Mock Data
  doctors = [
    { id: '1', name: 'Doctor 1' },
    { id: '2', name: 'Doctor 2' },
    { id: '3', name: 'Doctor 3' },
    { id: '4', name: 'General Appointment' },
  ];
  
  appointmentTimes = [
    { id: '1', time: ' 09:00 am - 10:00 am' },
    { id: '2', time: ' 10:00 am - 11:00 am' },
    { id: '3', time: ' 11:00 am - 12:00 pm' },
  ];

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  selectedDoctor: string = '';
  selectedTime: string = '';
  selectedDate: string = '';
  constructor() {}

  ngOnInit(): void {}

    
  onDoctorSelect(value:any) {
    this.selectedDoctor = value;
    // console.log(value);
  }

  onDateSelect(event:any) {
    this.selectedDate = event.value;   
 }

 checkAvailability(){
   
 }

  onSubmit(){
    console.log(this.selectedDoctor);
    console.log(this.selectedTime);
    console.log(this.selectedDate);
  }

}
