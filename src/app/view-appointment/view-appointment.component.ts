import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css'],
})
export class ViewAppointmentComponent implements OnInit {
  displayedColumns: string[] = ['position','date', 'time', 'doctor', 'status', 'action'];
  // dataSource = ELEMENT_DATA;
  appointmentData: any;
  id:any;

  constructor(private stateService: StateService, private tokenStorageService:TokenStorageService) {}

  ngOnInit(): void {
    this.id = this.tokenStorageService.getPatientID();
    this.refresh();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.appointmentData.filter = filterValue.trim().toLowerCase();
    this.sortData();
  }

  sortData() {
    this.appointmentData.sort(function (a: any, b: any) {
      if (a.date === b.date) {
        // Price is only important when cities are the same
        return a.time - b.time;
      }
      return a.date < b.date ? 1 : -1;
    });
  }

  refresh() {
    this.appointmentData = null;
    this.stateService.viewPatientAppointment(this.id).subscribe(
      (response) => {
        this.appointmentData = response.filter((val:any) => val.status == "approved" || val.status == "requested" || val.status == "denied");
        this.sortData();
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteRow(val: any) {
    this.stateService
      .cancelPatientAppointment(this.id,val.doctorID, val.date, val.time)
      .subscribe(
        (response) => {
          this.appointmentData = this.appointmentData.filter(
            (obj: any) =>
              obj.doctorID !== val.doctorID ||
              obj.date !== val.date ||
              obj.time !== val.time
          );
          this.sortData();
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    console.log(val);
  }
}
