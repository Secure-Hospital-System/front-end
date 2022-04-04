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

@Component({
  selector: 'app-lab-request',
  templateUrl: './lab-request.component.html',
  styleUrls: ['./lab-request.component.css'],
})
export class LabRequestComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'patient',
    'date',
    'doctor',
    'testName',
    // 'status',
    'action',
  ];
  labRequestSource: any;
  public hasAccess = false;
  isLabStaff = false;
  public id: any;

  @ViewChild(ReportDialogComponent) dialog!: ReportDialogComponent;

  constructor(
    private stateService: StateService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.stateService.fetchAllLabTests().subscribe(
      (res) => {
        this.labRequestSource = res.filter(
          (val: any) => val.status == 'requested'
        );
        // console.log(this.labRequestSource);
      },
      (error) => console.log(error)
    );
  }

  deleteRow(val: any) {
    console.log(val);
    const status = 'denied';
    this.stateService
      .updateLabRequest(
        val.patientID,
        val.recommender,
        val.dateRecommended,
        val.testName,
        status
      )
      .subscribe(
        res => {
          this.labRequestSource = this.labRequestSource.filter(
            (obj: any) =>
              obj.doctorID !== val.doctorID ||
              obj.date !== val.date ||
              obj.time !== val.time
          );
          console.log(res);
        },
        error=> {
          console.log(error);
        }
      );
  }

  approveRow(val: any) {
    console.log(val);
    const status = 'approved';
    this.stateService
      .updateLabRequest(
        val.patientID,
        val.recommender,
        val.dateRecommended,
        val.testName,
        status
      )
      .subscribe(
        res => {
          this.labRequestSource = this.labRequestSource.filter(
            (obj: any) =>
              obj.patientID !== val.patientID ||
              obj.recommender !== val.recommender ||
              obj.testName !== val.testName ||
              obj.dateRecommended !== val.dateRecommended 
          );
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }
}
