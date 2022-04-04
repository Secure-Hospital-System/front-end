import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

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
