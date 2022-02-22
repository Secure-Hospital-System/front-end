import {AfterViewInit, Component, OnInit, Injectable, Input, ViewChild} from '@angular/core';

//Inserting the MatTable Paginator and MatTable DataSource Module
import {MatTableDataSource} from '@angular/material/table';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';

export interface PeriodicElement {
  date: string;
  position: number;
  report: number;
  doctor: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, date: 'Hydrogen', report: 1.0079, doctor: 'H'},
  {position: 2, date: 'Helium', report: 4.0026, doctor: 'He'},
  {position: 3, date: 'Lithium', report: 6.941, doctor: 'Li'},
  {position: 4, date: 'Beryllium', report: 9.0122, doctor: 'Be'},
  {position: 5, date: 'Boron', report: 10.811, doctor: 'B'},
  {position: 6, date: 'Carbon', report: 12.0107, doctor: 'C'},
  {position: 7, date: 'Nitrogen', report: 14.0067, doctor: 'N'},
  {position: 8, date: 'Oxygen', report: 15.9994, doctor: 'O'},
  {position: 9, date: 'Fluorine', report: 18.9984, doctor: 'F'},
  {position: 10, date: 'Neon', report: 20.1797, doctor: 'Ne'},
];

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'date', 'report', 'doctor','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA)


  @ViewChild(ReportDialogComponent) dialog!: ReportDialogComponent;

  constructor() { }

  ngOnInit(): void {
  }

  delete(data:any){
    var value = this.dataSource.data.filter(function(item) {
      return item !== data
    })
    this.dataSource.data = value
  }

  edit(data:any){
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
