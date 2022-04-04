import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  public myForm!: FormGroup;
  total:any;
  PatientID:any;
  paitientInsurancedata!:string[];
  displayedColumns: string[] = ['select', 'position', 'name', 'weight'];
  displayedColumns1: string[] = ['approver', 'dateofRequest', 'dateOFApproved','claimAmount','approvedAmount'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(private userService: UserService, private tokenService: TokenStorageService) {
    this.total = 0;
  }

  //Error Function for alerting error on incorrect input in the form
  public myError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  };


  ngOnInit(): void {
    this.PatientID = this.tokenService.getUserID()
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
    this.userService.fetchPatientInsurancePolicy(this.PatientID).subscribe((data: any) => {
      this.myForm.setValue({
        patient: data.patientID,
        policyDetails: data.policyDetails,
        amount: data.amount
      })
    })

      this.userService.fetchPatientInsuranceClaims(this.PatientID).subscribe((data: any) => {
        var initialData = this.dataSource.data;
        for(var i = 0; i<data.length;i+=1){
          var add = {
            "dateOFApproved": data[i].dateOfApprove,
            "approvedAmount": data[i].approvedAmount,
            "dateOfRequest": data[i].dateOfRequest,
            "claimAmount":data[i].claimedAmount,
            "approver":data[i].approver,

          }
          initialData.push(add);
        }
        this.dataSource.data = initialData;

      })
    this.myForm.disable();
  }
}


export interface PeriodicElement {
  dateOFApproved: string
  dateOfRequest: string;
  claimAmount: string;
  approvedAmount: string;
  approver: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];
