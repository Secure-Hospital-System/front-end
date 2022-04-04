import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StateService } from '../services/state.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-completed-bills',
  templateUrl: './completed-bills.component.html',
  styleUrls: ['./completed-bills.component.css'],
})
export class CompletedBillsComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'patient',
    'transactionID',
    'date',
    'service',
    'status',
    'amount'
  ];
  billData: any;
  id: any;
  value = '';
  constructor(
    private stateService: StateService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  sortData() {
    this.billData.sort(function (a: any, b: any) {
      if (a.date === b.date) {
        // Price is only important when cities are the same
        return a.time - b.time;
      }
      return a.date < b.date ? 1 : -1;
    });
  }

  refresh() {
    this.stateService
    .fetchBillsOfPatient(this.tokenStorageService.getPatientID())
    .subscribe(
      (res) => {
        console.log(res);
        this.billData = res;
      },
      (error) => console.log(error)
    );
  }
}
