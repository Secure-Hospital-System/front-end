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
  isHospitalStaff = false;
  isLabStaff = false;
  @Input() id: string = '1';

  show: boolean = false;
  recordIndex = 0;
  diagnosisIndex = 0;
  prescriptionIndex = 0;

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

  sortData(val: any) {
    if (val) {
      val.sort(function (a: any, b: any) {
        return a.Date < b.Date ? 1 : -1;
      });
    }
    return val;
  }

  fetchData() {
    this.resetValues();
    this.displayedColumns =
      this.tokenStorageService.getUser().roles.includes('ROLE_DOCTOR') ||
      this.tokenStorageService.getUser().roles.includes('ROLE_ADMIN')
        ? ['Nos', 'Date', 'Diagnosis', 'DoctorId', 'PatientId', 'action']
        : ['Nos', 'Date', 'Diagnosis', 'DoctorId', 'PatientId'];
    this.displayedColumnsprescription =
      this.tokenStorageService.getUser().roles.includes('ROLE_DOCTOR') ||
      this.tokenStorageService.getUser().roles.includes('ROLE_ADMIN')
        ? ['Nos', 'Date', 'Prescription', 'DoctorId', 'PatientId']
        : ['Nos', 'Date', 'Prescription', 'DoctorId', 'PatientId'];
    this.displayedColumnsRecord =
      this.tokenStorageService.getUser().roles.includes('ROLE_DOCTOR') ||
      this.tokenStorageService.getUser().roles.includes('ROLE_ADMIN')
        ? ['Nos', 'Date', 'Record', 'DoctorId', 'PatientId', 'action']
        : ['Nos', 'Date', 'Record', 'DoctorId', 'PatientId'];

    this.show =
      this.tokenStorageService.getUser().roles.includes('ROLE_DOCTOR') ||
      this.tokenStorageService.getUser().roles.includes('ROLE_ADMIN');

    this.isHospitalStaff = this.tokenStorageService
      .getUser()
      .roles.includes('ROLE_HOSPITALSTAFF');

    this.isLabStaff = this.tokenStorageService
      .getUser()
      .roles.includes('ROLE_LABSTAFF');

    this.stateService.fetchUserDiagnosis(this.id).subscribe((data: any) => {
      console.log(data);
      var initialData = this.diagnosisSource.data;
      // var i = initialData.length;
      for (let i = 0; i < data.length; i++) {
        var addDiagnosis = {
          Nos: i + 1,
          Date: data[i].date,
          Diagnosis: data[i].diagnosis,
          DoctorId: data[i].doctorID,
          PatientId: data[i].patientID,
          LabTest: '',
        };
        initialData.push(addDiagnosis);
      }
      this.diagnosisSource.data = initialData;
      // this.diagnosisSource.data = this.sortData(this.diagnosisSource.data);
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
      // this.prescriptionSource.data = this.sortData(
      //   this.prescriptionSource.data
      // );
    });

    this.stateService.viewPatientRecord(this.id).subscribe((data: any) => {
      var initialData = this.recordSource.data;
      for (let i = 0; i < data.length; i++) {
        var addData = {
          Nos: i + 1,
          Date: data[i].date,
          Record: data[i].record,
          InputterID: data[i].inputter,
          PatientId: data[i].patientID,
          RecordId: data[i].recordID,
        };
        initialData.push(addData);
      }

      this.recordSource.data = initialData;
      // this.recordSource.data = this.sortData(this.recordSource.data);
    });
  }
  edit(data: any) {
    // data['LabTest'] = "";
    this.diagnosisIndex = data.Nos - 1;
    this.dialog.openDialog(data, 'edit');
  }

  createDiagnosis() {
    var data = { Date: '', Diagnosis: '', LabTest: '' };
    this.dialog.openDialog(data, 'createDiagnosis');
  }

  edit1(data: any) {
    this.prescriptionIndex = data.Nos - 1;
    this.dialog1.openDialog(data, 'edit');
  }

  edit2(data: any) {
    this.recordIndex = data.Nos - 1;
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

  recommendLabTest(
    patientID: any,
    recommender: any,
    dateRecommended: any,
    testName: any,
    status?: any
  ) {
    status = 'requested';
    this.stateService
      .recommendLabTest(
        patientID,
        recommender,
        dateRecommended,
        testName,
        status
      )
      .subscribe();
  }
  addDiagnosis(data: any) {
    var value = this.diagnosisSource.data;
    var l = value.length;
    if (data[1] == 'edit') {
      this.stateService
        .updatePatientDiagnosis(
          this.id,
          this.tokenStorageService.getUser().id,
          value[this.diagnosisIndex].Date,
          data[0].Date,
          data[0].Diagnosis
        )
        .subscribe(
          (res) => {
            if (
              data[0].LabTest &&
              data[0].LabTest != value[this.diagnosisIndex].LabTest
            ) {
              this.recommendLabTest(
                this.id,
                this.tokenStorageService.getUser().id,
                data[0].Date,
                data[0].LabTest
              );
            }
            value[this.diagnosisIndex].Date = data[0].Date;
            value[this.diagnosisIndex].Diagnosis = data[0].Diagnosis;
            value[this.diagnosisIndex].LabTest = data[0].LabTest;
            this.diagnosisSource.data = value;
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.stateService
        .createPatientDiagnosis(
          this.id,
          this.tokenStorageService.getUser().id,
          data[0].Date,
          data[0].Diagnosis
        )
        .subscribe(
          (res) => {
            value.push({
              Nos: l + 1,
              Date: data[0].Date,
              Diagnosis: data[0].Diagnosis,
              PatientId: this.id,
              DoctorId: this.tokenStorageService.getUser().id,
              LabTest: data[0].LabTest,
            });
            if (data[0].LabTest) {
              this.recommendLabTest(
                this.id,
                this.tokenStorageService.getUser().id,
                data[0].Date,
                data[0].LabTest
              );
            }
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
          this.id,
          this.tokenStorageService.getUser().id,
          data[0].Date,
          data[0].Prescription
        )
        .subscribe(
          (res) => {
            value.push({
              Nos: l + 1,
              Date: data[0].Date,
              Prescription: data[0].Prescription,
              PatientId: this.id,
              DoctorId: this.tokenStorageService.getUser().id,
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
    console.log(data);
    var value = this.recordSource.data;
    var l = value.length;
    if (data[1] == 'edit') {
      this.stateService
        .updatePatientRecord(
          this.id,
          data[0].Record,
          data[0].Date,
          value[0].RecordId,
          value[0].InputterID
        )
        .subscribe(
          (res) => {
            value[data[2] - 1].Date = data[0].Date;
            value[data[2] - 1].Record = data[0].Record;
            this.recordSource.data = value;
            // this.recordSource.data = this.sortData(this.recordSource.data);
            console.log(res);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.stateService
        .createPatientRecord(
          this.id,
          data[0].Record,
          data[0].Date,
          this.tokenStorageService.getUser().id
        )
        .subscribe(
          (res) => {
            value.push({
              Nos: l + 1,
              Date: data[0].Date,
              Record: data[0].Record,
              PatientId: this.id,
              InputterID: this.tokenStorageService.getUser().id,
              RecordId: this.tokenStorageService.getUser().id,
            });
            this.recordSource.data = value;
            // this.recordSource.data = this.sortData(this.recordSource.data);
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
  LabTest: string;
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
  InputterID: string;
  PatientId: string;
  RecordId: Number;
}

//Creating dummy data for inserting in the tables.
const ELEMENT_DATA: Diagnosis[] = [];

const Prescription_Data: Prescription[] = [];

const Record_Data: Record[] = [];
