import { Component, Input, OnInit } from '@angular/core';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {MatTableDataSource} from '@angular/material/table';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-insurancestaff',
  templateUrl: './insurancestaff.component.html',
  styleUrls: ['./insurancestaff.component.css']
})
export class InsurancestaffComponent implements OnInit {

  constructor(private stateService: UserService, public dialog: MatDialog) { }
  id = "1";
  @Input()
  diagnosisdata!: Object;

  //Column to be displayed for the table.
  public myForm!: FormGroup;
  displayedColumns!: string[]
  approveColumns!: string[]
  policyColumns!: string[]
  //Adding the table data to datasource
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  approvedTable = new MatTableDataSource(APPROVE_DATA);
  policiyTable = new MatTableDataSource(POLICY_DATA);


  //Error Function for alerting error on incorrect input in the form
  public myError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  };

  //Assigning the paginatior for limiting the no. of rows.
  ngOnInit(){
    //Column to be displayed for the table.
    this.displayedColumns = ["BillID",'Claim Amount', 'Approve Amount', 'Claim Request Date', 'action'];
    this.approveColumns = ["BillID",'Claim Amount', 'Approve Amount', 'Claim Request Date','Approver'];
    this.policyColumns = ["amount",'policyDetails', 'patientID', 'policyID'];

    this.myForm = new FormGroup({
      patient: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      policyDetails: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ])
    });

    this.stateService.fetchPendingBills().subscribe((data: any) => {
      var initialData = this.dataSource.data;
      for(var i = 0; i<data.length;i+=1){
        var add = {
          "BillID": data[i].billID.toString(),
          "ClaimedAmount": data[i].claimedAmount,
          "ApproveAmount": data[i].approvedAmount,
          "ClaimRequestDate": data[i].dateOfRequest,
        }
        initialData.push(add);
      }
      this.dataSource.data = initialData;
    });

    this.stateService.fetchApprovedBills().subscribe((data: any) => {
      var iData = this.approvedTable.data;
      for(var i = 0; i<data.length;i+=1){
        var add = {
          "BillID": data[i].billID,
          "ClaimedAmount": data[i].claimedAmount,
          "ApproveAmount": data[i].approvedAmount,
          "ClaimRequestDate": data[i].dateOfRequest,
          "ApproverId": data[i].approver
        }
        iData.push(add);
      }
      this.approvedTable.data = iData;
    });

    this.stateService.fetchInsurancePolicy().subscribe((data:any)=>{
      var iData = this.policiyTable.data;

      for(var i = 0; i<data.length;i+=1){
        var add = {
          "amount": data[i].amount,
          "policyID": data[i].policyID,
          "policyDetails": data[i].policyDetails,
          "patientID": data[i].patientID,
        }
        iData.push(add);
      }
      this.policiyTable.data = iData;
    });
  }

  ngAfterViewInit() {
  }

  save(data:any){
    console.log(data)
    this.stateService.addInsurancePolicy(data.amount,data.patient,data.policyDetails).subscribe((data:any)=>{
      window.location.reload();
    })
  }

  edit(){

  }

  add(data:any){
    this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe(confirm => {
    this.stateService.updateApprovedBills(data.BillID,confirm,8).subscribe((data:any)=>{
      console.log(data)
      window.location.reload();
    })
  });
  }

  delete(data:any){
    this.stateService.updateApprovedBills(data.BillID,0,8).subscribe((data:any)=>{
      window.location.reload();
    })
  }
}

//Creating the Table Element interface for table data type
export interface Diagnosis {
  BillID: String;
  ClaimedAmount: string;
  ApproveAmount: string;
  ClaimRequestDate: string;
}

export interface Approve {
  BillID: String;
  ClaimedAmount: string;
  ApproveAmount: string;
  ClaimRequestDate: string;
  ApproverId: string;
}

export interface Policy {
  amount: String;
  policyID: string;
  policyDetails: string;
  patientID: string;
}

//Creating dummy data for inserting in the tables.
const ELEMENT_DATA: Diagnosis[] = [];
const APPROVE_DATA: Approve[] = [];
const POLICY_DATA: Policy[] = [];


