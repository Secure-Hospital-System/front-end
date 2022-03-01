import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor() { }
  public myForm!: FormGroup;
  public patient!: Patient;
  ngOnInit(): void {

    //Creating the myForm Data and validating each input field.
    this.myForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required, Validators.maxLength(20),Validators.pattern('^[a-zA-Z \-\']+')]),
      LastName: new FormControl('', [Validators.required, Validators.maxLength(20),Validators.pattern('^[a-zA-Z \-\']+')]),
      Address1: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      Address2: new FormControl('', [Validators.maxLength(50)]),
      City: new FormControl('', [Validators.required, Validators.maxLength(20),Validators.pattern('^[a-zA-Z \-\']+')]),
      State: new FormControl('', [Validators.required, Validators.maxLength(20),Validators.pattern('^[a-zA-Z \-\']+')]),
      Date: new FormControl('', [Validators.required]),
      Age: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      BloodGroup: new FormControl('', [Validators.required,Validators.maxLength(3), Validators.pattern('^[a-zA-Z+\\- \-\']+')]),
      PostalCode: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      Gender: new FormControl('',[Validators.required])

      });

    //Setting the initial value for the Patient's form
    this.myForm.setValue(this.patient = {
      FirstName: "Sachin",
      LastName: "Tendulkar",
      PostalCode: "12345",
      BloodGroup: "A",
      City: true,
      Age: "2",
      Address1:  "400050",
      Address2:"sdfljalksdfj",
      Date:new Date("Tue Feb 08 2022 00:00:00 GMT-0700 (Mountain Standard Time)"),
      State:"sfasdf",
      Gender:"Female"

    })

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
  FirstName: string;
  LastName: string;
  PostalCode: string;
  BloodGroup: string;
  City: boolean;
  Age: string;
  Address1: string;
  Address2: string;
  Date: Date;
  State: string;
  Gender:string;
  }
