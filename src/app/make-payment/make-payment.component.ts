import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StateService } from '../services/state.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css'],
})
export class MakePaymentComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'patient',
    'transactionID',
    'date',
    'status',
    'amount',
    'makePayement'
  ];
  appointmentData: any;
  transactionData: any;
  id: any;
  value = '';
  hospitalStaffId: any;
  constructor(
    private stateService: StateService,
    private tokenStorageService: TokenStorageService,
    private route: Router
  ) {}

  ngOnInit(): void {
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

  redirectToPayment(val: any) {
    console.log(val);
    this.stateService.transactionDetails = val;
    this.route.navigate(['/payment-details']);
  }


  refresh() {
    this.stateService
      .fetchTransactionOfPatient(this.tokenStorageService.getUserID())
      .subscribe((res) => {
        console.log('Patient Transactions:', res);
        this.transactionData = res;
        this.transactionData = res.filter(
          (val: any) => val.status == 'approved_transaction'
        );
      });
  }

}
