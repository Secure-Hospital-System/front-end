import { isDataSource } from '@angular/cdk/collections';
import {AfterViewInit, Component, Input, ViewChild, ɵɵtrustConstantResourceUrl} from '@angular/core';
import { StateService } from '../services/state.service';

import {MatTableDataSource} from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { PrescriptionDialogComponent } from '../prescription-dialog/prescription-dialog.component';

//Table Component
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

export class TableComponent implements AfterViewInit {
  constructor(private stateService: StateService) {}
  id = "1";
  @Input()
  user!: string;
  diagnosisdata!: Object;
  prescriptiondata!: Object;
  show: boolean = false;

  //Column to be displayed for the table.
  displayedColumns!: string[]
  displayedColumnsprescription!: string[]
  //Adding the table data to datasource
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  prescriptionSource = new MatTableDataSource(Prescription_Data);

  @ViewChild(DialogComponent) dialog!: DialogComponent;
  @ViewChild(PrescriptionDialogComponent) dialog1!: PrescriptionDialogComponent;

  //Assigning the paginatior for limiting the no. of rows.
  ngOnInit(){
    //Column to be displayed for the table.
    this.displayedColumns = (this.user=='patient'? ["Nos",'Date', 'Diagnosis', 'DoctorId', 'PatientId']:["Nos",'Date', 'Diagnosis', 'DoctorId', 'PatientId','action']);
    this.displayedColumnsprescription = (this.user=='patient'? ["Nos",'Date', 'Prescription', 'DoctorId', 'PatientId']:["Nos",'Date', 'Prescription', 'DoctorId', 'PatientId','action']);

    this.show = this.user ==="doctor";
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

    this.stateService.fetchUserPrescription(this.id).subscribe((data: any) => {
      var initialData = this.prescriptionSource.data;
      var i = initialData.length;
      var add = {
        "Nos": i+1,
        "Date": data.date,
        "Prescription": data.prescription,
        "DoctorId": data.doctorID,
        "PatientId": data.patientID
      }
      initialData.push(add);

      this.prescriptionSource.data = initialData;
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

  edit1(data:any){
    this.dialog1.openDialog(data,"edit")

  }

  create1(){
    var data ={Date:"",Prescription:""}
    this.dialog1.openDialog(data,"create")
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

  add1(data:any){
    console.log(data)
    var value = this.prescriptionSource.data
    var l = value.length
    if (data[1]=="edit"){
      value[data[2]-1].Date=data[0].Date
      value[data[2]-1].Prescription=data[0].Prescription
      this.prescriptionSource.data = value
    }
    else{
      value.push({
        "Nos": l+1,
        "Date": data[0].Date,
        "Prescription": data[0].Prescription,
        "PatientId":value[l-1].PatientId,
        "DoctorId":value[l-1].DoctorId
      })
      this.prescriptionSource.data = value
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
  delete1(data:any){
    var value = this.prescriptionSource.data.filter(function(item) {
      return item !== data
    })
    for(var i=0;i<value.length;i+=1){
      value[i].Nos = i+1
    }
    this.prescriptionSource.data = value
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

