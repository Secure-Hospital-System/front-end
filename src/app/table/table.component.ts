import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';

//Inserting the MatTable Paginator and MatTable DataSource Module
import {MatPaginator} from '@angular/material/paginator';
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

  @Input()
  user: string ='patient';
  show: boolean = false;

  //Column to be displayed for the table.
  displayedColumns: string[] = (this.user=='patient'? ['position', 'name', 'weight', 'symbol','charges','NextAppointment']:['position', 'name', 'weight', 'symbol','charges','NextAppointment','action']);

  //Adding the table data to datasource
  dataSource = new MatTableDataSource<TableElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(DialogComponent) dialog!: DialogComponent;
  @ViewChild(PrescriptionDialogComponent) dialog1!: PrescriptionDialogComponent;

  //Assigning the paginatior for limiting the no. of rows.
  ngOnInit(){
    this.show = this.user ==="doctor";
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  edit(data:any){
    this.dialog.openDialog(data,"edit")
  }

  create(){
    var data ={name:"",weight:"",position:""}
    this.dialog.openDialog(data,"create")
  }

  edit1(data:any){
    this.dialog.openDialog(data,"edit")

  }

  create1(){
    var data ={name:"",weight:"",position:""}
    this.dialog.openDialog(data,"create")
  }

  add(data:any){
    var value = this.dataSource.data
    var l = value.length
    if (data[1]=="edit"){
      value[data[0].Date-1].name = data[0].FirstName
      value[data[0].Date-1].position=data[0].Date
      value[data[0].Date-1].weight=data[0].Diagnosis
      this.dataSource.data = value
    }
    else{
      value.push(data)
      this.dataSource.data = value
    }
  }

  add1(data:any){
    var value = this.dataSource.data
    var l = value.length
    if (data[1]=="edit"){
      value[data[0].Date-1].name = data[0].FirstName
      value[data[0].Date-1].position=data[0].Date
      value[data[0].Date-1].weight=data[0].Diagnosis
      this.dataSource.data = value
    }
    else{
      value.push(data)
      this.dataSource.data = value
    }
  }

  delete(data:any){
    var value = this.dataSource.data.filter(function(item) {
      return item !== data
    })
    this.dataSource.data = value
  }
}

//Creating the Table Element interface for table data type
export interface TableElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  charges: string;
  NextAppointment: string;
}

//Creating dummy data for inserting in the tables.
const ELEMENT_DATA: TableElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', charges: '100',NextAppointment:'100'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',charges: '100',NextAppointment:'100'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',charges: '100',NextAppointment:'100'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',charges: '100',NextAppointment:'100'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B',charges: '100',NextAppointment:'100'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',charges: '100',NextAppointment:'100'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',charges: '100',NextAppointment:'100'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',charges: '100',NextAppointment:'100'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F',charges: '100',NextAppointment:'100'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',charges: '100',NextAppointment:'100'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na',charges: '100',NextAppointment:'100'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg',charges: '100',NextAppointment:'100'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al',charges: '100',NextAppointment:'100'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si',charges: '100',NextAppointment:'100'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P',charges: '100',NextAppointment:'100'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S',charges: '100',NextAppointment:'100'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl',charges: '100',NextAppointment:'100'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar',charges: '100',NextAppointment:'100'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K',charges: '100',NextAppointment:'100'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca',charges: '100',NextAppointment:'100'},
];

