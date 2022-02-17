import { Component, OnInit } from '@angular/core';

export interface appointmentData {
  date: string;
  position: number;
  time: string;
  doctor: string;
}

const ELEMENT_DATA: appointmentData[] = [
  {position: 1, date: '1/2/22', time: '1:00 pm', doctor: 'Doctor 1'},
  {position: 2, date: '2/2/22', time: '2:00 pm', doctor: 'Doctor 2'},
  {position: 3, date: '3/2/22', time: '3:00 pm', doctor: 'Doctor 3'},
];


@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {

    
  displayedColumns: string[] = ['position', 'date', 'time', 'doctor','action'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

  deleteRow(val:any){
    this.dataSource = this.dataSource.filter(obj => obj.position !== val.position);
    console.log(this.dataSource);
  }

}
