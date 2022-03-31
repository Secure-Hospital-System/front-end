import { Component, OnInit } from '@angular/core';

import { StateService } from '../services/state.service';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-pending-appointments',
  templateUrl: './pending-appointments.component.html',
  styleUrls: ['./pending-appointments.component.css'],
})
export class PendingAppointmentsComponent implements OnInit {
  displayedColumns: string[] = ['position','patient','date', 'time', 'doctor', 'status', 'action'];
  appointmentData: any;
  id: any;
  hospitalStaffId: any;
  constructor(
    private stateService: StateService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.hospitalStaffId = this.tokenStorageService.getUserID();
    this.refresh();
  }

  sortData() {
    this.appointmentData.sort(function (a: any, b: any) {
      if (a.date === b.date) {
        // Price is only important when cities are the same
        return a.time - b.time;
      }
      return a.date < b.date ? 1 : -1;
    });
  }

  refresh() {
    this.appointmentData = null;
    this.stateService.viewAllAppointments().subscribe(
      (response) => {
        this.appointmentData = response;
        this.sortData();
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteRow(val: any) {
    this.stateService
      .declineAppointment(
        val.patientID,
        val.doctorID,
        this.hospitalStaffId,
        val.date,
        val.time
      )
      .subscribe(
        (response) => {
          this.appointmentData = this.appointmentData.filter(
            (obj: any) =>
              obj.doctorID !== val.doctorID ||
              obj.date !== val.date ||
              obj.time !== val.time
          );
          this.sortData();
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    console.log(val);
  }

  approveRow(val: any) {
    this.stateService
      .approveAppointment(
        val.patientID,
        val.doctorID,
        this.hospitalStaffId,
        val.date,
        val.time
      )
      .subscribe(
        response => {
          this.appointmentData = this.appointmentData.filter(
            (obj: any) =>
              obj.doctorID !== val.doctorID ||
              obj.date !== val.date ||
              obj.time !== val.time
          );
          this.sortData();
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    console.log(val);
  }
  updateRow(val: any) { }
}
