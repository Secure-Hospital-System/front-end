import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  ViewChild,
  ɵɵtrustConstantResourceUrl,
} from '@angular/core';
import { StateService } from '../services/state.service';

import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { PrescriptionDialogComponent } from '../prescription-dialog/prescription-dialog.component';
import { RecorddialogComponent } from '../recorddialog/recorddialog.component';
import { TokenStorageService } from '../services/token-storage.service';

//Table Component
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnChanges {
  constructor(
    private stateService: StateService,
    private tokenStorageService: TokenStorageService
  ) {}
  // @Input() user: string = 'patient';
  @Input() id: string = '1';

  show: boolean = false;

  //Column to be displayed for the table.
  displayedColumns!: string[];
  displayedColumnsprescription!: string[];
  displayedColumnsRecord!: string[];
  //Adding the table data to datasource
  diagnosisSource = new MatTableDataSource(ELEMENT_DATA);
  prescriptionSource = new MatTableDataSource(Prescription_Data);
  recordSource = new MatTableDataSource(Record_Data);

  @ViewChild(DialogComponent) dialog!: DialogComponent;
  @ViewChild(PrescriptionDialogComponent) dialog1!: PrescriptionDialogComponent;
  @ViewChild(RecorddialogComponent) dialog2!: RecorddialogComponent;

  ngOnChanges() {
    if (this.id) {
      this.fetchData();
    }
  }

  resetValues() {
    this.diagnosisSource = new MatTableDataSource(ELEMENT_DATA);
    this.diagnosisSource.data = [];
    this.prescriptionSource = new MatTableDataSource(Prescription_Data);
    this.prescriptionSource.data = [];
    this.recordSource = new MatTableDataSource(Record_Data);
    this.recordSource.data = [];
  }

  sortData(val:any){
    if(val){
      val.sort( function(a:any, b:any) {
        return a.Date < b.Date ? 1 : -1;
     });
    }
    return val;
  }

  fetchData() {
    this.resetValues();
    this.displayedColumns = this.tokenStorageService
      .getUser()
      .roles.includes('ROLE_DOCTOR')
      ? ['Nos', 'Date', 'Diagnosis', 'DoctorId', 'PatientId', 'action']
      : ['Nos', 'Date', 'Diagnosis', 'DoctorId', 'PatientId'];
    this.displayedColumnsprescription = this.tokenStorageService
      .getUser()
      .roles.includes('ROLE_DOCTOR')
      ? ['Nos', 'Date', 'Prescription', 'DoctorId', 'PatientId','action']
      : ['Nos', 'Date', 'Prescription', 'DoctorId', 'PatientId'];
    this.displayedColumnsRecord = this.tokenStorageService
      .getUser()
      .roles.includes('ROLE_DOCTOR')
      ? ['Nos', 'Date', 'Record', 'DoctorId', 'PatientId', 'action']
      : ['Nos', 'Date', 'Record', 'DoctorId', 'PatientId'];

    this.show = this.tokenStorageService.getUser().roles.includes('ROLE_DOCTOR');
    this.stateService.fetchUserDiagnosis(this.id).subscribe((data: any) => {
      console.log(data)
      var initialData = this.diagnosisSource.data;
      // var i = initialData.length;
      for (let i = 0; i < data.length; i++) {
        var addDiagnosis = {
          Nos: i + 1,
          Date: data[i].date,
          Diagnosis: data[i].diagnosis,
          DoctorId: data[i].doctorID,
          PatientId: data[i].patientID,
        };
        initialData.push(addDiagnosis);
      }
      this.diagnosisSource.data = initialData;
      this.diagnosisSource.data = this.sortData(this.diagnosisSource.data);
    });

    this.stateService.fetchUserPrescription(this.id).subscribe((data: any) => {
      var initialData = this.prescriptionSource.data;
      // var i = initialData.length;
      for (let i = 0; i < data.length; i++) {
        var addData = {
          Nos: i + 1,
          Date: data[i].date,
          Prescription: data[i].prescription,
          DoctorId: data[i].doctorID,
          PatientId: data[i].patientID,
        };
        initialData.push(addData);
      }
      this.prescriptionSource.data = initialData;
      this.prescriptionSource.data = this.sortData(this.prescriptionSource.data);
    });

    this.stateService.viewPatientRecord(this.id).subscribe((data: any) => {
      var initialData = this.recordSource.data;
      for (let i = 0; i < data.length; i++) {
        var addData = {
          Nos: i + 1,
          Date: data[i].date,
          Record: data[i].record,
          DoctorId: data[i].inputter,
          PatientId: data[i].patientID,
        };
        initialData.push(addData);
      }


      this.recordSource.data = initialData;
      this.recordSource.data = this.sortData(this.recordSource.data);
    });
  }
  edit(data: any) {
    this.dialog.openDialog(data, 'edit');
  }

  createDiagnosis() {
    var data = { Date: '', Diagnosis: '' };
    this.dialog.openDialog(data, 'createDiagnosis');
  }

  edit1(data: any) {
    this.dialog1.openDialog(data, 'edit');
  }

  edit2(data: any) {
    this.dialog2.openDialog(data, 'edit');
  }

  create1() {
    var data = { Date: '', Prescription: '' };
    this.dialog1.openDialog(data, 'createDiagnosis');
  }

  create2() {
    var data = { Date: '', Record: '' };
    this.dialog2.openDialog(data, 'createDiagnosis');
  }

  addDiagnosis(data: any) {
    var value = this.diagnosisSource.data;
    var l = value.length;
    if (data[1] == 'edit') {
      this.stateService
        .updatePatientDiagnosis(
          value[l - 1].PatientId,
          value[l - 1].DoctorId,
          value[l - 1].Date,
          data[0].Date,
          data[0].Diagnosis
        )
        .subscribe(
          (res) => {
            value[data[2] - 1].Date = data[0].Date;
            value[data[2] - 1].Diagnosis = data[0].Diagnosis;
            this.diagnosisSource.data = value;
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.stateService
        .createPatientDiagnosis(
          value[l - 1].PatientId,
          value[l - 1].DoctorId,
          data[0].Date,
          data[0].Diagnosis
        )
        .subscribe(
          (res) => {
            value.push({
              Nos: l + 1,
              Date: data[0].Date,
              Diagnosis: data[0].Diagnosis,
              PatientId: value[l - 1].PatientId,
              DoctorId: value[l - 1].DoctorId,
            });
            this.diagnosisSource.data = value;
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  addPrescription(data: any) {
    // console.log(data);
    var value = this.prescriptionSource.data;
    var l = value.length;
    if (data[1] == 'edit') {
      value[data[2] - 1].Date = data[0].Date;
      value[data[2] - 1].Prescription = data[0].Prescription;
      this.prescriptionSource.data = value;
    } else {
      this.stateService
        .createPatientPrescription(
          value[l - 1].PatientId,
          value[l - 1].DoctorId,
          data[0].Date,
          data[0].Prescription
        )
        .subscribe(
          (res) => {
            value.push({
              Nos: l + 1,
              Date: data[0].Date,
              Prescription: data[0].Prescription,
              PatientId: value[l - 1].PatientId,
              DoctorId: value[l - 1].DoctorId,
            });
            this.prescriptionSource.data = value;
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  addRecord(data: any) {
    // console.log(data);
    var value = this.recordSource.data;
    var l = value.length;
    if (data[1] == 'edit') {
      value[data[2] - 1].Date = data[0].Date;
      value[data[2] - 1].Record = data[0].Record;
      this.recordSource.data = value;
    } else {
      this.stateService
        .createPatientPrescription(
          value[l - 1].PatientId,
          value[l - 1].DoctorId,
          data[0].Date,
          data[0].Record
        )
        .subscribe(
          (res) => {
            value.push({
              Nos: l + 1,
              Date: data[0].Date,
              Record: data[0].Record,
              PatientId: value[l - 1].PatientId,
              DoctorId: value[l - 1].DoctorId,
            });
            this.recordSource.data = value;
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  deleteDiagnosis(data: any) {
    // console.log('Delete Diagnosis:', data);
    this.stateService
      .deletePatientDiagnosis(
        data.PatientId,
        data.DoctorId,
        data.Date,
        data.Diagnosis
      )
      .subscribe(
        (res) => {
          var value = this.diagnosisSource.data.filter(function (item) {
            return item !== data;
          });
          for (var i = 0; i < value.length; i += 1) {
            value[i].Nos = i + 1;
          }
          this.diagnosisSource.data = value;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  delete1(data: any) {
    var value = this.prescriptionSource.data.filter(function (item) {
      return item !== data;
    });
    for (var i = 0; i < value.length; i += 1) {
      value[i].Nos = i + 1;
    }
    this.prescriptionSource.data = value;
  }

  deleteRecord(data: any) {
    // var value = this.recordSource.data.filter(function (item) {
    //   return item !== data;
    // });
    // for (var i = 0; i < value.length; i += 1) {
    //   value[i].Nos = i + 1;
    // }
    // this.recordSource.data = value;
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

export interface Record {
  Nos: Number;
  Date: string;
  Record: string;
  DoctorId: string;
  PatientId: string;
}

//Creating dummy data for inserting in the tables.
const ELEMENT_DATA: Diagnosis[] = [];

const Prescription_Data: Prescription[] = [];

const Record_Data: Record[] = [];
