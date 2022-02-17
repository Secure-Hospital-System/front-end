import { Component, OnInit } from '@angular/core';

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
  displayedColumns: string[] = ['position', 'date', 'report', 'doctor'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
