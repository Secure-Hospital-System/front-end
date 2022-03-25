import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../services/state.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private stateService: StateService) { }
  public myForm!: FormGroup;
  public patient!: Patient;
  public diagnosisdata!: Object;
  public prescriptiondata!: Object;
  id = "1";

  ngOnInit(): void {

    //Creating the myForm Data and validating each input field.
    this.myForm = new FormGroup({
      Name: new FormControl('', [Validators.required, Validators.maxLength(20),Validators.pattern('^[a-zA-Z \-\']+')]),
      Address: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      Age: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      CreditCard: new FormControl('', [Validators.required, Validators.maxLength(16) ,Validators.pattern("^[0-9]*$")]),
      PhoneNumber: new FormControl('', [Validators.required, Validators.maxLength(10) ,Validators.pattern("^[0-9]*$")]),
      Gender: new FormControl('',[Validators.required])

      });

    this.stateService.fetchUserDetails(this.id).subscribe((data: any) => {
      this.myForm.setValue(this.patient = {
        Name: data.name,
        PhoneNumber: data.phoneNumber,
        Age: data.age,
        Address: data.address,
        CreditCard: data.creditCard,
        Gender: data.gender

      })
    });

    this.stateService.fetchUserDiagnosis(this.id).subscribe((data: any) => {
      console.log('User Diagnosis:',data);
      this.diagnosisdata = data;
    });

    this.stateService.fetchUserPrescription(this.id).subscribe((data: any) => {
      console.log('User Prescription:',data);
      this.prescriptiondata = data;
    });

    this.stateService.fetchUserReport(this.id).subscribe((data: any) => {
      console.log('User Report:',data);
    });


    //Disabling the form
    this.myForm.disable()
  }

  //Error Function for alerting error on incorrect input in the form
  public myError = (controlName: string, errorName: string) =>{
    return this.myForm.controls[controlName].hasError(errorName);
    }

  //Save function executed after submitting the patient input data.
  save(data:any) {
    console.log(data)
    this.myForm.disable()
  }

  //Edit function executed for editing the patient input data.
  edit(){
    this.myForm.enable()
  }

}

//Patient data class interface
export interface Patient {
  Name: string;
  PhoneNumber: string;
  Age: string;
  Address: string;
  CreditCard: string;
  Gender:string;
  }
