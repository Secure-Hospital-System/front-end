import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { StateService } from '../services/state.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css'],
})
export class CreateAppointmentComponent implements OnInit {
  appointmentData: any;
  availableAppointment: any;
  availableTime: any;
  doctors: any;
  appointmentBooked = false;
  errorBooking = false;
  id: any;
  selectedDoctorID: string = '';
  selectedDoctorName: string = '';
  selectedTime: string = '';
  selectedDate: string = '';
  constructor(
    private stateService: StateService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  onDoctorSelect(value: any) {
    this.selectedDoctorID = value.doctorID;
    this.selectedDoctorName = value.name;
    this.availableTime = null;
    this.selectedDate = '';
    this.selectedTime = '';
    this.availableAppointment = this.appointmentData.filter(
      (val: any) => val.name == this.selectedDoctorName
    );
    this.availableAppointment = this.availableAppointment.reduce(
      (unique: any, o: any) => {
        if (!unique.some((obj: any) => obj.date === o.date)) {
          unique.push(o);
        }
        return unique;
      },
      []
    );

    this.availableAppointment.sort(function (a: any, b: any) {
      return a.date > b.date ? 1 : -1;
    });
    var newList = [];
    for(let i=0;i<7;i++){
      newList.push(this.availableAppointment[i]);
    }
    this.availableAppointment = newList;
    console.log(this.availableAppointment);
  }

  onDateSelect(event: any) {
    this.selectedDate = event.value;
  }

  dateSelected(source: any) {
    console.log(source.value);
    this.availableTime = this.appointmentData.filter(
      (val: any) =>
        val.name == this.selectedDoctorName && val.date == source.value
    );
    this.availableTime = this.availableTime.map((val: any) => val.time);
    this.availableTime.sort();
    console.log(this.availableTime);
  }

  onSubmit() {
    this.stateService
      .bookAppointment(
        this.id,
        this.selectedDoctorID,
        this.selectedDate,
        this.selectedTime
      )
      .subscribe(
        (response) => {
          if (response == true) {
            this.appointmentBooked = true;
            this.errorBooking = false;
          } else {
            this.errorBooking = true;
          }
          console.log(response);
        },
        (error) => {
          this.errorBooking = true;
          console.log(error);
        }
      );
  }

  refresh() {
    this.availableTime = null;
    this.selectedDate = '';
    this.selectedTime = '';
    this.appointmentBooked = false;
    this.selectedDoctorID = '';
    this.selectedDoctorName = '';
    this.appointmentData = null;
    this.availableAppointment = null;
    this.availableTime = null;
    this.doctors = null;
    this.errorBooking = false;

    this.id = this.tokenStorageService.getPatientID();
    this.stateService.fetchListOfAppointments().subscribe((data: any) => {
      // console.log('List of Appointments', data);
      this.appointmentData = data;
      var result = data.map((val: any) => ({
        doctorID: val.doctorID,
        name: val.name,
      }));
      result = result.reduce((unique: any, o: any) => {
        if (
          !unique.some(
            (obj: any) => obj.doctorID === o.doctorID && obj.name === o.name
          )
        ) {
          unique.push(o);
        }
        return unique;
      }, []);
      this.doctors = result;
      // console.log('Doctor of Appointments', this.doctors);
    });
  }
}
