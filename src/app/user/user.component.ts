import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from '../services/state.service';
import { TokenStorageService } from '../services/token-storage.service';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  private roles: string[] = [];
  appointmentData: any = null;
  status = ['approved', 'completed'];
  selectedStatus = this.status[0];
  constructor(
    private stateService: StateService,
    private tokenStorageService: TokenStorageService,
    private route:Router
  ) {}
  public myForm!: FormGroup;
  public patient!: Patient;
  public diagnosisdata!: Object;
  public prescriptiondata!: Object;
  public isDoctor = false;
  public isHosptialStaff = false;
  public isLabStaff = false;
  public id: any;
  value = '';

  storePatientId(id: string) {
    console.log(id);
    if (id) {
      this.fetchPatientData(id);
    }
  }

  onSubmit() {
    if(this.appointmentData){
    this.stateService
      .updatePatientAppointment(
        this.appointmentData.patientID,
        this.appointmentData.doctorID,
        this.appointmentData.approver,
        this.appointmentData.date,
        this.appointmentData.time,
        this.selectedStatus
      )
      .subscribe(
        res=>{
          this.stateService.appointmentDetais = null;
          this.route.navigate(['/user']);
        },
        error => console.log(error)
      );
    }
    this.stateService.appointmentDetais = null;
    console.log(this.selectedStatus);
  }
  fetchPatientData(id: string) {
    console.log('Fetch Patient Data with id:', id);
    this.id = id;
    //Creating the myForm Data and validating each input field.
    this.stateService.fetchUserDetails(id).subscribe((data: any) => {
      this.myForm.setValue(
        (this.patient = {
          Name: data.name,
          PhoneNumber: data.phoneNumber,
          Age: data.age,
          Address: data.address,
          CreditCard: data.creditCard,
          Gender: data.gender,
        })
      );
    });

    //Disabling the form
    this.myForm.disable();
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      Name: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern("^[a-zA-Z -']+"),
      ]),
      Address: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      Age: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      CreditCard: new FormControl('', [
        Validators.required,
        Validators.maxLength(16),
        Validators.pattern('^[0-9]*$'),
      ]),
      PhoneNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$'),
      ]),
      Gender: new FormControl('', [Validators.required]),
    });

    if (this.stateService.appointmentDetais) {
      this.appointmentData = this.stateService.appointmentDetais;
      this.id = this.appointmentData.patientID;
      this.fetchPatientData(this.id);
    }

    this.roles = this.tokenStorageService.getUser().roles;
    if (this.roles.includes('ROLE_DOCTOR') ) {
      this.isDoctor = true;
    }

    if (this.roles.includes('ROLE_HOSPITALSTAFF') || this.roles.includes('ROLE_ADMIN')) {
      this.isHosptialStaff = true;
    }

    if (this.roles.includes('ROLE_LABSTAFF')) {
      this.isLabStaff = true;
    }

    if (!this.isDoctor && !this.isHosptialStaff && !this.isLabStaff) {
      this.id = this.tokenStorageService.getPatientID();
      this.fetchPatientData(this.id);
    }
  }

  //Error Function for alerting error on incorrect input in the form
  public myError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  };

  //Save function executed after submitting the patient input data.
  save(data: any) {
    // console.log(data);
    this.stateService
      .updatePatientProfile(
        this.id,
        data.Age,
        data.Gender,
        data.Address,
        data.PhoneNumber,
        data.CreditCard
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
    this.myForm.disable();
  }

  //Edit function executed for editing the patient input data.
  edit() {
    this.myForm.enable();
  }

  ngOnDestroy() {
    this.stateService.appointmentDetais = null;
  }
}

//Patient data class interface
export interface Patient {
  Name: string;
  PhoneNumber: string;
  Age: string;
  Address: string;
  CreditCard: string;
  Gender: string;
}
