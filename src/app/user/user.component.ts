import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../services/state.service';
import { TokenStorageService } from '../services/token-storage.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private roles: string[] = [];
  constructor(private stateService: StateService, private tokenStorageService: TokenStorageService) { }
  public myForm!: FormGroup;
  public patient!: Patient;
  public diagnosisdata!: Object;
  public prescriptiondata!: Object;
  public isDoctor = false;
  public id:any;
  value = '';
  // heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  storePatientId(id: string) {
    console.log(id);
    if (id) {
      this.fetchPatientData(id);
    }
  }


  fetchPatientData(id:string){
    this.id = id;
    //Creating the myForm Data and validating each input field.
    this.stateService.fetchUserDetails(id).subscribe((data: any) => {
      this.myForm.setValue(this.patient = {
        Name: data.name,
        PhoneNumber: data.phoneNumber,
        Age: data.age,
        Address: data.address,
        CreditCard: data.creditCard,
        Gender: data.gender

      })
    });

    //Disabling the form
    this.myForm.disable()
  }

  ngOnInit(): void {
    this.roles = this.tokenStorageService.getUser().roles;
    if(this.roles.includes('ROLE_DOCTOR')){
      this.isDoctor= true;
    }
    
    this.myForm = new FormGroup({
      Name: new FormControl('', [Validators.required, Validators.maxLength(20),Validators.pattern('^[a-zA-Z \-\']+')]),
      Address: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      Age: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      CreditCard: new FormControl('', [Validators.required, Validators.maxLength(16) ,Validators.pattern("^[0-9]*$")]),
      PhoneNumber: new FormControl('', [Validators.required, Validators.maxLength(10) ,Validators.pattern("^[0-9]*$")]),
      Gender: new FormControl('',[Validators.required])

      });
      if(!this.isDoctor){
        this.fetchPatientData(this.id);
      }
      
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
