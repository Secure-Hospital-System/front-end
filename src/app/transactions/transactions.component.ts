import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StateService } from '../services/state.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'patient',
    'transactionID',
    'date',
    'status',
    'amount',
    'action',
    'generateBill'
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

  refresh() {
    if(this.tokenStorageService.getUser().roles.includes('ROLE_ADMIN')){
      this.displayedColumns= [
        'position',
        'patient',
        'transactionID',
        'date',
        'status',
        'amount',
        'action-admin'
      ];
      this.stateService.fetchAllTransactions().subscribe((res) => {
        console.log('All Transactions:', res);
        this.transactionData = res.filter((val:any) => val.status=="init_transaction");
      });
      
    }
    else if(this.tokenStorageService.getUser().roles.includes('ROLE_HOSPITALSTAFF')){
      this.stateService.fetchAllTransactions().subscribe((res) => {
        console.log('All Transactions:', res);
        this.transactionData = res.filter((val:any) => val.status=="finished_transaction" || val.status =="completed_transaction");
  
      });
    } else if(this.tokenStorageService.getUser().roles.includes('ROLE_PATIENT')){
      this.stateService.fetchTransactionOfPatient(this.tokenStorageService.getUserID()).subscribe((res) => {
        console.log('Patient Transactions:', res);
        this.transactionData = res.filter((val:any) => val.status=="completed_transaction" || val.status == "finished_transaction" || val.status =="completed");
  
        this.displayedColumns= [
          'position',
          'patient',
          'transactionID',
          'date',
          'status',
          'amount'
        ];
      });
    }
   
  }
       
  approveRow(val: any,index:any) {
    let transactionStatus = "finished_transaction";
    if(this.tokenStorageService.getUser().roles.includes('ROLE_ADMIN')){
      transactionStatus = "approved_transaction";
    }
    
    this.stateService
      .updateTransaction(
        val.transactionID,
        transactionStatus
      )
      .subscribe(
        (response) => {
          this.transactionData[index].status = transactionStatus;
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  generateBill(val:any,index:number){
    console.log(val);
    // Final Completed
    const transactionStatus = "completed";
    const service = "Checkup";
    const billStatus = "completed";
    this.stateService.createBills(
      val.payer,
      val.transactionID,
      service,
      val.transactionAmount,
      billStatus,
      new Date()
    ).subscribe(
      res => {
        this.stateService
        .updateTransaction(
          val.transactionID,
          transactionStatus
        )
        .subscribe(
          (response) => {
            this.transactionData[index].status = transactionStatus;
            this.transactionData = response.filter((val:any) => val.status=="finished_transaction" || val.status =="completed_transaction");
            // this.transactionData[index].generateBill =true;
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );

  }


}
