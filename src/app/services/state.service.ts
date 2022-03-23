import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class StateService {

  constructor(private http: HttpClient) {}


//   // Fetch recipe name from node server which is hosted 
  fetchUserDetails(id?:string): Observable<any> {
    return this.http.get('http://localhost:3000/api/patient/profile/'+id).pipe(
      map((data: any) => {
        // console.log('Patient', data);
        return data;
      })
    );
  }

  fetchUserDiagnosis(id?:string): Observable<any> {
    return this.http.get('http://localhost:3000/api/patient/diagnosis/'+id).pipe(
      map((data: any) => {
        // console.log('Patient', data);
        return data;
      })
    );
  }

  fetchUserPrescription(id?:string): Observable<any> {
    return this.http.get('http://localhost:3000/api/patient/prescription/'+id).pipe(
      map((data: any) => {
        // console.log('Patient', data);
        return data;
      })
    );
  }

  fetchUserReport(id?:string): Observable<any> {
    return this.http.get('http://localhost:3000/api/patient/report/'+id).pipe(
      map((data: any) => {
        // console.log('Patient', data);
        return data;
      })
    );
  }

  fetchListOfAppointments(): Observable<any> {
    return this.http.get('http://localhost:3000/api/appointments').pipe(
      map((data: any) => {
        return data;
      })
    );
  }


}