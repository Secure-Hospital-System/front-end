import { Component, ViewChild,AfterViewInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { RouterLinkWithHref } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements AfterViewInit {

  total:any;
  constructor() {
    this.total = 0;
  }

  ngOnInit(): void {
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['select', 'position', 'name', 'weight'];
  displayedColumns1: string[] = ['position', 'name', 'weight','symbol','charges','NextAppointment','Status'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }



  add(row:any,val:boolean){
    this.selection.toggle(row);
    if (val == true){
      this.total -= row.weight;
    }
    else{
      this.total += row.weight;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.total = 0
      return;
    }
    this.selection.select(...this.dataSource.data);
    this.total = 0
    this.total += this.dataSource.data.reduce((a,b)=>a+(b['weight']||0),0);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  charges: string;
  NextAppointment:string;
  Status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', charges: '100',NextAppointment:'100',Status:'Active'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',charges: '100',NextAppointment:'100',Status:'Active'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',charges: '100',NextAppointment:'100',Status:'Active'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',charges: '100',NextAppointment:'100',Status:'Active'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B',charges: '100',NextAppointment:'100',Status:'Processed'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',charges: '100',NextAppointment:'100',Status:'Active'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',charges: '100',NextAppointment:'100',Status:'Processed'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',charges: '100',NextAppointment:'100',Status:'Processed'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F',charges: '100',NextAppointment:'100',Status:'Active'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',charges: '100',NextAppointment:'100',Status:'InActive'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na',charges: '100',NextAppointment:'100',Status:'Active'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg',charges: '100',NextAppointment:'100',Status:'Active'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al',charges: '100',NextAppointment:'100',Status:'Active'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si',charges: '100',NextAppointment:'100',Status:'Active'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P',charges: '100',NextAppointment:'100',Status:'Active'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S',charges: '100',NextAppointment:'100',Status:'Active'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl',charges: '100',NextAppointment:'100',Status:'Active'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar',charges: '100',NextAppointment:'100',Status:'Active'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K',charges: '100',NextAppointment:'100',Status:'Active'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca',charges: '100',NextAppointment:'100',Status:'Active'},
];
