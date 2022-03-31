
import { isDataSource } from '@angular/cdk/collections';
import {AfterViewInit, Component, Input, OnInit, ViewChild, ɵɵtrustConstantResourceUrl} from '@angular/core';
import { StateService } from '../services/state.service';

import {MatTableDataSource} from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { PrescriptionDialogComponent } from '../prescription-dialog/prescription-dialog.component';

@Component({
  selector: 'app-insurancestaff',
  templateUrl: './insurancestaff.component.html',
  styleUrls: ['./insurancestaff.component.css']
})
export class InsurancestaffComponent implements OnInit {

  constructor(private stateService: StateService) {}
  id = "1";
  @Input()
  diagnosisdata!: Object;

  //Column to be displayed for the table.
  displayedColumns!: string[]
  //Adding the table data to datasource
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  prescriptionSource = new MatTableDataSource(Prescription_Data);

  @ViewChild(DialogComponent) dialog!: DialogComponent;
  @ViewChild(PrescriptionDialogComponent) dialog1!: PrescriptionDialogComponent;

  //Assigning the paginatior for limiting the no. of rows.
  ngOnInit(){
    //Column to be displayed for the table.
    this.displayedColumns = ["Nos",'Date', 'Diagnosis', 'DoctorId', 'PatientId','action'];

    this.stateService.fetchUserDiagnosis(this.id).subscribe((data: any) => {
      var initialData = this.dataSource.data
      var i = initialData.length;
      var add = {
        "Nos": i+1,
        "Date": data.date,
        "Diagnosis": data.diagnosis,
        "DoctorId": data.doctorID,
        "PatientId": data.patientID
      }
      initialData.push(add);

      this.dataSource.data = initialData;
    });

  }
  ngAfterViewInit() {
  }

  edit(data:any){
    this.dialog.openDialog(data,"edit",)
  }

  create(){
    var data ={Date:"",Diagnosis:""}
    this.dialog.openDialog(data,"create")
  }

  add(data:any){
    var value = this.dataSource.data
    var l = value.length
    if (data[1]=="edit"){
      value[data[2]-1].Date=data[0].Date
      value[data[2]-1].Diagnosis=data[0].Diagnosis
      this.dataSource.data = value
    }
    else{
      value.push({
        "Nos": l+1,
        "Date": data[0].Date,
        "Diagnosis": data[0].Diagnosis,
        "PatientId":value[l-1].PatientId,
        "DoctorId":value[l-1].DoctorId
      })
      this.dataSource.data = value
    }
  }

  delete(data:any){
    var value = this.dataSource.data.filter(function(item) {
      return item !== data
    })
    for(var i=0;i<value.length;i+=1){
      value[i].Nos = i+1
    }
    this.dataSource.data = value
  }
}

//Creating the Table Element interface for table data type
export interface Diagnosis {
  Nos: Number;
  Date: string;
  Diagnosis: string;
  DoctorId: string;
  PatientId: string;
}

export interface Prescription {
  Nos: Number;
  Date: string;
  Prescription: string;
  DoctorId: string;
  PatientId: string;
}

//Creating dummy data for inserting in the tables.
const ELEMENT_DATA: Diagnosis[] = [];

const Prescription_Data: Prescription[] = [];

