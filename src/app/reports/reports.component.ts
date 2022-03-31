import {AfterViewInit, Component, OnInit, Injectable, Input, ViewChild} from '@angular/core';

//Inserting the MatTable Paginator and MatTable DataSource Module
import {MatTableDataSource} from '@angular/material/table';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { StateService } from '../services/state.service';
import { TokenStorageService } from '../services/token-storage.service';

export interface PeriodicElement {
  date: string;
  position: number;
  report: number;
  doctor: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'doctor','testName','status','record','action'];
  dataSource = new MatTableDataSource()
  public hasAccess = false;
  public id:any;
  storePatientId(id: string) {
    console.log(id);
    if (id) {
      this.fetchPatientReport(id);
    }
  }

  @ViewChild(ReportDialogComponent) dialog!: ReportDialogComponent;

  constructor(private stateService: StateService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {

    if( this.tokenStorageService.getUser().roles.includes('ROLE_DOCTOR') || this.tokenStorageService.getUser().roles.includes('ROLE_HOSPITALSTAFF')){
      this.hasAccess= true;
    } else {
      this.id = this.tokenStorageService.getPatientID();
      this.fetchPatientReport(this.id);
    }

  }

  fetchPatientReport(id:any){
    this.stateService.getPatientLabReport(id).subscribe(
      res => {
        console.log(res);
        this.dataSource = res;
      },
      error => console.log(error)
    )
  }
  delete(data:any){
    var value = this.dataSource.data.filter(function(item) {
      return item !== data
    })
    this.dataSource.data = value
  }

  edit(data:any){
    console.log(data)
    this.dialog.openDialog(data,"edit")
  }

  add(data:any){
    var values = this.dataSource.data
    if (data[1]=="create"){
      var position = values.length+1
      values.push({
        "doctor":data[0].FirstName,
        "report":data[0].LabTest,
        "date":data[0].Date,
        "position":position
      })
    }
    else if (data[1]=="edit"){
      var curpos = data[2]-1
      values[curpos]={
        "doctor":data[0].FirstName,
        "report":data[0].LabTest,
        "date":data[0].Date,
        "position":curpos
      };
    }
    this.dataSource.data =values
  }

  create(){
    var data = {"doctor":"",
        "report":"",
        "date":"",
        "position":""}
    this.dialog.openDialog(data,"create")

  }

}
