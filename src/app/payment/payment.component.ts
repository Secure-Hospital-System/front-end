import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CompletedBillsComponent } from '../completed-bills/completed-bills.component';
import { CreateTransactionComponent } from '../create-transaction/create-transaction.component';
import { MakePaymentComponent } from '../make-payment/make-payment.component';
import { TokenStorageService } from '../services/token-storage.service';
import { TransactionsComponent } from '../transactions/transactions.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @ViewChild(CreateTransactionComponent) private createTransactionComponent:any;
  @ViewChild(MakePaymentComponent) private makePaymentComponent:any;
  @ViewChild(TransactionsComponent) private transactionsComponent:any;
  @ViewChild(CompletedBillsComponent) private completedBillsComponent:any;

  constructor(private token:TokenStorageService) { }
  tabName = 'Transaction';
  tabName2 = 'Transaction';
  isPatient = false;
  isAdmin = false;
  ngOnInit(): void {
    if(this.token.getUser().roles.includes('ROLE_ADMIN')){
      this.isAdmin = true;
      this.tabName2 = "Approve Transactions";
    }
    if(this.token.getUser().roles.includes('ROLE_HOSPITALSTAFF')){
      this.tabName = "Create Transaction";
      this.tabName2 = "Complete Transactions";

    }else {
      this.tabName2 = "View Transactions";
      this.isPatient = true;
    }
  
  }

  onTabChanged(event: MatTabChangeEvent) 
  {
    console.log(event.index);
    this.createTransactionComponent.refresh();
    this.makePaymentComponent.refresh();
    this.transactionsComponent.refresh();
    this.completedBillsComponent.refresh();

    if(event.index == 0)
    {
        // this.createAppointmentComponent.refresh();//Or whatever name the method is called
    }
    else
    {
        // this.viewAppointmentComponent.refresh(); //Or whatever name the method is called
    }
  }
}
