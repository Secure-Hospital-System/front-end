import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';


@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css'],
})
export class ViewAppointmentComponent implements OnInit {
  displayedColumns: string[] = ['date', 'time', 'doctor', 'status','action'];
  // dataSource = ELEMENT_DATA;
  appointmentData:any ;

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    this.appointmentData = null;
    this.stateService.viewPatientAppointment().subscribe(
      (response) => {
        this.appointmentData = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteRow(val: any) {
    this.stateService.cancelPatientAppointment(val.doctorID,val.date,val.time).subscribe(
      (response) => {
           this.appointmentData = this.appointmentData.filter((obj:any) => (((obj.doctorID !== val.doctorID) || (obj.date !== val.date) || (obj.time !== val.time)))
    );
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(val);
  }
}
