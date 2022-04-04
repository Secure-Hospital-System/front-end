import {
  AfterViewInit,
  Component,
  OnInit,
  Injectable,
  Input,
  ViewChild,
} from '@angular/core';

//Inserting the MatTable Paginator and MatTable DataSource Module
import { MatTableDataSource } from '@angular/material/table';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { StateService } from '../services/state.service';
import { TokenStorageService } from '../services/token-storage.service';
import jsPDF from 'jspdf';

export interface PeriodicElement {
  date: string;
  position: number;
  report: number;
  doctor: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  displayedColumns: string[] = [
    'dateR',
    'doctor',
    'testName',
    'status',
    'record',
    'download',
  ];
  dataSource: any;
  public hasAccess = false;
  isLabStaff = false;
  public id: any;
  storePatientId(id: string) {
    console.log(id);
    if (id) {
      this.fetchPatientReport(id);
    }
  }

  @ViewChild(ReportDialogComponent) dialog!: ReportDialogComponent;

  constructor(
    private stateService: StateService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorageService.getUser().roles.includes('ROLE_LABSTAFF')) {
      this.isLabStaff = true;
      this.displayedColumns = [
        'position',
        'patient',
        'dateR',
        'doctor',
        'testName',
        'status',
        'dateF',
        'record',
        'inputter',
        'action',
        'download',
      ];
      this.fetchAllPatientReports();
    } else if (
      this.tokenStorageService.getUser().roles.includes('ROLE_DOCTOR') ||
      this.tokenStorageService.getUser().roles.includes('ROLE_HOSPITALSTAFF') ||
      this.tokenStorageService.getUser().roles.includes('ROLE_ADMIN')
    ) {
      this.hasAccess = true;
    } else {
      this.id = this.tokenStorageService.getPatientID();
      this.fetchPatientReport(this.id);
    }
  }

  fetchAllPatientReports() {
    this.stateService.fetchAllLabTests().subscribe(
      (res) => {
        console.log(res);
        this.dataSource = res.filter(
          (val: any) => val.status == 'approved' || val.status == 'completed'
        );
      },
      (error) => console.log(error)
    );
  }

  fetchPatientReport(id: any) {
    this.stateService.getPatientLabReport(id).subscribe(
      (res) => {
        console.log(res);
        this.dataSource = res.filter((val: any) => val.status == 'completed');
      },
      (error) => console.log(error)
    );
  }

  delete(data: any, index: any) {
    console.log(data);
    this.stateService
      .deleteLabReportData(
        data.patientID,
        data.recommender,
        data.dateRecommended,
        data.testName
      )
      .subscribe(
        (res) => {
          this.dataSource = this.dataSource.filter(
            (val: any) =>
              val.patientID != data.patientID ||
              val.recommender != data.recommender ||
              val.dateRecommended != data.dateRecommended ||
              val.testName != data.testName
          );
        },
        (error) => console.log(error)
      );
  }

  edit(data: any, index: number) {
    data.position = index;
    console.log(data);
    if (data.dateFilled) {
      this.dialog.openDialog(data, 'edit');
    } else {
      this.dialog.openDialog(data, 'create');
    }
  }

  add(data: any) {
    console.log(data);
    const index = data[2];
    // var values = this.dataSource.data;
    // console.log(values);
    if (data[1] == 'create') {
      this.stateService
        .updateLabReportData(
          this.dataSource[index].patientID,
          this.dataSource[index].recommender,
          this.dataSource[index].dateRecommended,
          this.dataSource[index].testName,
          data[0].status,
          data[0].record,
          this.tokenStorageService.getUser().id,
          data[0].date
        )
        .subscribe(
          (res) => {
            this.dataSource[index].status = data[0].status;
            this.dataSource[index].record = data[0].record;
            this.dataSource[index].inputter =
              this.tokenStorageService.getUser().id;
            this.dataSource[index].dateFilled = data[0].date;
          },
          (error) => {
            console.log(error);
          }
        );
    } else if (data[1] == 'edit') {
      this.stateService
        .updateLabReportData(
          this.dataSource[index].patientID,
          this.dataSource[index].recommender,
          this.dataSource[index].dateRecommended,
          this.dataSource[index].testName,
          data[0].status,
          data[0].record,
          this.tokenStorageService.getUser().id,
          data[0].date
        )
        .subscribe(
          (res) => {
            this.dataSource[index].status = data[0].status;
            this.dataSource[index].record = data[0].record;
            this.dataSource[index].inputter =
              this.tokenStorageService.getUser().id;
            this.dataSource[index].dateFilled = data[0].date;
          },
          (error) => {
            console.log(error);
          }
        );
    }
    // this.dataSource.data =values
  }

  download(val?: any) {
    console.log(val);
    let doctor = this.stateService.doctors.find(
      (x: any) => x.doctorID == val.recommender
    );
    doctor = doctor ? doctor.name : val.recommender;
    var doc = new jsPDF();
    doc.text('Report', 50, 10);
    doc.text('Patient: ' + val.patientID, 20, 3 * 10);
    doc.text('Date: ' + val.dateFilled, 20, 4 * 10);
    doc.text('Doctor: ' + doctor, 20, 5 * 10);
    doc.text('Test: ' + val.testName, 20, 6 * 10);
    doc.text('Record: ' + val.record, 20, 7 * 10);
    doc.save('Record_' + val.patientID + '.pdf');
  }

  create() {
    var data = { doctor: '', report: '', date: '', position: '' };
    this.dialog.openDialog(data, 'create');
  }
}
