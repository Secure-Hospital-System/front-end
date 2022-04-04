import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StateService } from '../services/state.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css'],
})
export class CreateTransactionComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'patient',
    'date',
    'time',
    'doctor',
    'status',
    'amount',
  ];
  appointmentData: any;
  id: any;
  value = '';
  hospitalStaffId: any;
  constructor(
    private stateService: StateService,
    private tokenStorageService: TokenStorageService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.hospitalStaffId = this.tokenStorageService.getUserID();
    // if(this.tokenStorageService.getUser().roles.includes('ROLE_DOCTOR')){

    // }
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
    if (
      this.tokenStorageService.getUser().roles.includes('ROLE_HOSPITALSTAFF')
    ) {
      this.displayedColumns = [
        'position',
        'patient',
        'date',
        'time',
        'doctor',
        'status',
        'amountEdit',
      ];
      this.stateService.viewAllAppointments().subscribe(
        (response) => {
          this.appointmentData = response.filter(
            (val: any) => val.status == 'completed'
          );
          this.sortData();
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    if (this.tokenStorageService.getUser().roles.includes('ROLE_PATIENT')) {
      this.displayedColumns = [
        'position',
        'patient',
        'date',
        'time',
        'doctor',
        'status',
        'amount',
        'makePayement',
      ];
      this.stateService
        .viewPatientAppointment(this.tokenStorageService.getUserID())
        .subscribe(
          (response) => {
            this.appointmentData = response.filter(
              (val: any) => val.status == 'approved_transaction'
            );
            this.sortData();
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    }
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

  redirectToPayment(val: any) {
    console.log(val);
    this.stateService.appointmentDetais = val;
    this.route.navigate(['/payment-details']);
  }

  submit(val: any) {
    console.log(val);
    if (val.amount) {
      // TODO Update to init_transaction
      const status = 'init_transaction';
      this.stateService
            .createTransaction(
              val.patientID,
              new Date(),
              status,
              val.amount
            )
            .subscribe(
              (res) => {
                this.appointmentData = this.appointmentData.filter(
                  (obj: any) =>
                    obj.doctorID !== val.doctorID ||
                    obj.date !== val.date ||
                    obj.time !== val.time ||
                    obj.patientID != val.patientID ||
                    obj.approver !== val.approver
                );
                // this.paymentCompleted = true;
                console.log(res);
              },
              (error) => {
                console.log(error);
              }
            );
        
      this.stateService
        .updatePatientAppointment(
          val.patientID,
          val.doctorID,
          val.approver,
          val.date,
          val.time,
          status,
          val.amount
        )
        .subscribe(
          (res) => {
            console.log(res);
            // this.appointmentData = this.appointmentData.filter(
            //   (obj: any) =>
            //     obj.doctorID !== val.doctorID ||
            //     obj.date !== val.date ||
            //     obj.time !== val.time ||
            //     obj.patientID != val.patientID ||
            //     obj.approver !== val.approver
            // );
            // this.route.navigate(['/user']);
          },
          (error) => console.log(error)
        );
    }
  }
}
