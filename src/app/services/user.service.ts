
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { map } from 'rxjs/operators';

const API_URL = 'http://ec2-54-235-234-187.compute-1.amazonaws.com:8080/api/test/';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  fetchPendingBills(): Observable<any> {
    return this.http.get('http://18.233.8.27:8080/api/insurance/query4').pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  updateApprovedBills(bill?:string,amount?:number,approver?:number): Observable<any> {
    return this.http.get('http://18.233.8.27:8080/api/insurance/query5/'+bill+'/'+approver+'/'+amount).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  fetchApprovedBills(): Observable<any> {
    return this.http.get('http://18.233.8.27:8080/api/insurance/query6').pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  fetchInsurancePolicy(): Observable<any> {
    return this.http.get('http://18.233.8.27:8080/api/insurance/policies').pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addInsurancePolicy(amount?:string,patientID?:string,policyDetails?:string): Observable<any> {
    return this.http.get('http://18.233.8.27:8080/api/insurance/policy/create/'+patientID+'/'+amount+'/'+policyDetails).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  fetchPatientInsurancePolicy(patientId?:string): Observable<any> {
    return this.http.get('http://18.233.8.27:8080/api/insurance/policy/view/'+patientId).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  fetchPatientInsuranceClaims(patientId?:string): Observable<any> {
    return this.http.get('http://18.233.8.27:8080/api/insurance/query3/'+patientId).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
