import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class StateService {
  doctors:any;
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {

    this.fetchAllDoctors();
  }


  //   // Fetch recipe name from node server which is hosted
  fetchUserDetails(id?: string): Observable<any> {
    return this.http
      .get('http://localhost:4000/api/patient/profile/' + id)
      .pipe(
        map((data: any) => {
          // console.log('Patient', data);
          return data;
        })
      );
  }

  fetchUserDiagnosis(id?: string): Observable<any> {
    return this.http
      .get('http://localhost:4000/api/patient/diagnosis/' + id)
      .pipe(
        map((data: any) => {
          // console.log('Patient', data);
          return data;
        })
      );
  }

  fetchUserPrescription(id?: string): Observable<any> {
    return this.http
      .get('http://localhost:4000/api/patient/prescription/' + id)
      .pipe(
        map((data: any) => {
          // console.log('Patient', data);
          return data;
        })
      );
  }

  fetchUserReport(id?: string): Observable<any> {
    return this.http.get('http://localhost:4000/api/patient/report/' + id).pipe(
      map((data: any) => {
        // console.log('Patient', data);
        return data;
      })
    );
  }

  fetchListOfAppointments(): Observable<any> {
    return this.http.get('http://localhost:4000/api/appointments').pipe(
      map((data: any) => {
        // console.log('appointments', data);
        return data;
      })
    );
  }

  bookAppointment(patientID:any,doctorID: any, date: any, time: any): Observable<any> {
    var body = {
      patientID: patientID,
      doctorID: doctorID,
      date: date,
      time: time,
    };
    return this.http
      .post('http://localhost:4000/api/book/appointment', body)
      .pipe(
        map((data: any) => {
          // console.log('book appointments', data);
          return data;
        })
      );
  }

  viewPatientAppointment(patientID:any): Observable<any> {
    return this.http.get('http://localhost:4000/api/patient/appointment/' + patientID);
  }

  cancelPatientAppointment(patientID:any,doctorID: any, date: any, time: any): Observable<any> {
    const body = {
      patientID: patientID,
      doctorID: doctorID,
      date: date,
      time: time,
    };
    return this.http.post('http://localhost:4000/api/patient/cancel/appointment',body);
  }

  viewAllAppointments():Observable<any> {
    return this.http.get('http://localhost:4000/api/fetchAllAppointments');
  }

  approveAppointment(patientID:any,doctorID: any,hospitalStaffID:any, date: any, time: any):Observable<any> {
    const body = {
      hospitalStaffID:hospitalStaffID,
      patientID: patientID,
      doctorID: doctorID,
      date: date,
      time: time,
    };
    return this.http.post('http://localhost:4000/api/hospitalStaff/patient/appointment/approve',body);
  }

  declineAppointment(patientID:any,doctorID: any,hospitalStaffID:any, date: any, time: any):Observable<any> {
    const body = {
      hospitalStaffID:hospitalStaffID,
      patientID: patientID,
      doctorID: doctorID,
      date: date,
      time: time,
    };
    return this.http.post('http://localhost:4000/api/hospitalStaff/patient/appointment/decline',body);
  }
  // Patient Record 

  viewPatientRecord(id:any):Observable<any>{
    return this.http.get('http://localhost:4000/api/doctor/patient/records/' + id);
  }

  updatePatientRecord(record:any,date:any,recordID:any,inputter:any):Observable<any>{
    const body = {
      patientID: this.tokenStorageService.getUserID(),
      record: record,
      date: date,
      recordID: recordID,
      inputter: inputter
    };
    return this.http.post('http://localhost:4000/api/doctor/patient/record/update',body);
  }


  // Patient Diagnosis
  createPatientDiagnosis(patientID:any,doctorID:any,date:any,diagnosis:any):Observable<any>{
    const body = {
      patientID: patientID,
      doctorID: doctorID,
      date: date,
      diagnosis: diagnosis
    };
    return this.http.post('http://localhost:4000/api/doctor/patient/diagnosis/create',body);
  }

    // Update Diagnosis
    updatePatientDiagnosis(patientID:any,doctorID:any,old_date:any,new_date:any,diagnosis:any):Observable<any>{
      const body = {
        patientID: patientID,
        doctorID: doctorID,
        old_date: old_date,
        new_date: new_date,
        diagnosis: diagnosis
      };
      return this.http.post('http://localhost:4000/api/doctor/patient/diagnosis/update',body);
    }

    
    // Delete Diagnosis
    deletePatientDiagnosis(patientID:any,doctorID:any,date:any,diagnosis:any):Observable<any>{
      const body = {
        patientID: patientID,
        doctorID: doctorID,
        date: date,
        diagnosis: diagnosis
      };
      return this.http.post('http://localhost:4000/api/doctor/patient/diagnosis/delete',body);
    }


    // Create Patient Presciptions
    createPatientPrescription(patientID:any,doctorID:any,date:any,prescription:any):Observable<any>{
      const body = {
        patientID: patientID,
        doctorID: doctorID,
        date: date,
        prescription: prescription
      };
      return this.http.post('http://localhost:4000/api/doctor/patient/prescription/create',body);
    }


    // Get Patient Lab Report
    getPatientLabReport(patientID:any):Observable<any>{
      return this.http.get('http://localhost:4000/api/doctor/patient/report/' + patientID);
    }

    // Update Patient Profile
    updatePatientProfile(patientID:any,age:any,gender:any,address:any,phoneNumber:any,creditCard:any):Observable<any>{
      const body = {
        patientID: patientID,
        age: age,
        gender: gender,
        address: address,
        phoneNumber: phoneNumber,
        creditCard: creditCard
      };
      return this.http.post('http://localhost:4000/api/patient/profile/update',body);
    }


    // Fetch List of All Doctors

    fetchAllDoctors(){
      this.http.get('http://localhost:4000/api/fetchAllDoctors').subscribe(
        res=> this.doctors=res,
        error =>console.log(error)
      )
    }
}