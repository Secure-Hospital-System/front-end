import { Component, Input, OnInit } from '@angular/core';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {MatTableDataSource} from '@angular/material/table';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';
import { StateService } from '../services/state.service';
@Component({
  selector: 'app-insurancestaff',
  templateUrl: './insurancestaff.component.html',
  styleUrls: ['./insurancestaff.component.css']
})
export class InsurancestaffComponent implements OnInit {

  constructor(private userService: UserService, public dialog: MatDialog,private tokenStorage: TokenStorageService,private stateService:StateService) { }
  id = "1";
  @Input()
  diagnosisdata!: Object;
  validate = false;

  //Column to be displayed for the table.
  public myForm!: FormGroup;
  displayedColumns!: string[]
  approveColumns!: string[]
  policyColumns!: string[]
  //Adding the table data to datasource
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  approvedTable = new MatTableDataSource(APPROVE_DATA);
  policiyTable = new MatTableDataSource(POLICY_DATA);
  patientData!: Number[];


  //Error Function for alerting error on incorrect input in the form
  public myError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  };

  //Assigning the paginatior for limiting the no. of rows.
  ngOnInit(){
    this.patientData = [];
    //Column to be displayed for the table.
    this.displayedColumns = ["transactionID",'Claim Amount', 'Approve Amount', 'Claim Request Date', 'action'];
    this.approveColumns = ["transactionID",'Claim Amount', 'Approve Amount', 'Claim Request Date','Approver'];
    this.policyColumns = ['policyID','patientID',"amount",'policyDetails' ];

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

    this.userService.fetchPendingBills().subscribe((data: any) => {
      var initialData = this.dataSource.data;
      for(var i = 0; i<data.length;i+=1){
        var add = {
          "TransactionID": data[i].transactionID.toString(),
          "ClaimedAmount": data[i].claimedAmount,
          "ApproveAmount": data[i].approvedAmount,
          "ClaimRequestDate": data[i].dateOfRequest,
        }
        initialData.push(add);
      }
      this.dataSource.data = initialData;
    });

    this.userService.fetchApprovedBills().subscribe((data: any) => {
      var iData = this.approvedTable.data;
      for(var i = 0; i<data.length;i+=1){
        var add = {
          "TransactionID": data[i].transactionID,
          "ClaimedAmount": data[i].claimedAmount,
          "ApproveAmount": data[i].approvedAmount,
          "ClaimRequestDate": data[i].dateOfRequest,
          "ApproverId": data[i].approver
        }
        iData.push(add);
      }
      this.approvedTable.data = iData;
    });


    this.userService.fetchInsurancePolicy().subscribe((data:any)=>{
      var iData = this.policiyTable.data;
      for(var i = 0; i<data.length;i+=1){
        this.patientData.push(data[i].patientID)
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
    if (this.patientData.includes(parseInt(data.patient))){
      this.validate = true;
    }
    else{
    this.userService.addInsurancePolicy(data.amount,data.patient,data.policyDetails).subscribe((data:any)=>{
      window.location.reload();
    })
  }
  }

  edit(){

  }

  add(data:any){

    this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe(confirm => {
      const status = 'completed_transaction';
      this.stateService.updateTransaction(data.TransactionID, status).subscribe(
        (res) => {
          this.userService.updateApprovedBills(data.TransactionID,confirm,this.tokenStorage.getUserID()).subscribe((data:any)=>{
            window.location.reload();
          })
        },
        (error) => {
          console.log(error);
        }
      );

  });
  }

  delete(data:any){
    const status = 'denied';
    this.stateService.updateTransaction(data.TransactionID, status).subscribe(
      (res) => {
        this.userService.updateApprovedBills(data.TransactionID,0,this.tokenStorage.getUserID()).subscribe((data:any)=>{
          window.location.reload();
        })
      },
      (error) => {
        console.log(error);
      }
    );


  }
}

//Creating the Table Element interface for table data type
export interface Diagnosis {
  TransactionID: String;
  ClaimedAmount: string;
  ApproveAmount: string;
  ClaimRequestDate: string;
}

export interface Approve {
  TransactionID: String;
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


