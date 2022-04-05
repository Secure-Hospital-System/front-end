import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
const SERVER_API =
  // 'http://ec2-54-235-234-187.compute-1.amazonaws.com:8080';
  // 'http://localhost:4000';
  'http://ec2-18-212-236-103.compute-1.amazonaws.com:4000';
// const
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class StateService {
  doctors: any;
  private seletedAppointment = null;
  private transactionData = null;
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {
    this.fetchAllDoctors();
  }

  set appointmentDetais(app: any) {
    this.seletedAppointment = app;
  }

  get appointmentDetais() {
    return this.seletedAppointment;
  }

  set transactionDetails(data: any) {
    this.transactionData = data;
  }

  get transactionDetails() {
    return this.transactionData;
  }

  fetchUserDetails(id: string): Observable<any> {
    // const body = {}
    return this.http.get(SERVER_API + '/api/patient/profile/' + id).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  fetchUserDiagnosis(id: string): Observable<any> {
    // let queryParams = new HttpParams();
    // queryParams = queryParams.append("Id")
    return this.http.get(SERVER_API + '/api/patient/diagnosis/' + id).pipe(
      map((data: any) => {
        // console.log('Patient', data);
        return data;
      })
    );
  }

  fetchUserPrescription(id: string): Observable<any> {
    return this.http.get(SERVER_API + '/api/patient/prescription/' + id).pipe(
      map((data: any) => {
        // console.log('Patient', data);
        return data;
      })
    );
  }

  fetchUserReport(id: string): Observable<any> {
    return this.http.get(SERVER_API + '/api/patient/report/' + id).pipe(
      map((data: any) => {
        // console.log('Patient', data);
        return data;
      })
    );
  }

  fetchListOfAppointments(): Observable<any> {
    return this.http.get(SERVER_API + '/api/appointments').pipe(
      map((data: any) => {
        // console.log('appointments', data);
        return data;
      })
    );
  }

  bookAppointment(
    patientID: any,
    doctorID: any,
    date: any,
    time: any
  ): Observable<any> {
    var body = {
      patientID: patientID,
      doctorID: doctorID,
      date: date,
      time: time,
    };
    return this.http.post(SERVER_API + '/api/book/appointment', body).pipe(
      map((data: any) => {
        // console.log('book appointments', data);
        return data;
      })
    );
  }

  viewPatientAppointment(patientID: any): Observable<any> {
    return this.http.get(SERVER_API + '/api/patient/appointment/' + patientID);
  }

  cancelPatientAppointment(
    patientID: any,
    doctorID: any,
    date: any,
    time: any
  ): Observable<any> {
    const body = {
      patientID: patientID,
      doctorID: doctorID,
      date: date,
      time: time,
    };
    return this.http.post(SERVER_API + '/api/patient/cancel/appointment', body);
  }

  viewAllAppointments(): Observable<any> {
    return this.http.get(SERVER_API + '/api/fetchAllAppointments');
  }

  approveAppointment(
    patientID: any,
    doctorID: any,
    hospitalStaffID: any,
    date: any,
    time: any
  ): Observable<any> {
    const body = {
      hospitalStaffID: hospitalStaffID,
      patientID: patientID,
      doctorID: doctorID,
      date: date,
      time: time,
    };
    return this.http.post(
      SERVER_API + '/api/hospitalStaff/patient/appointment/approve',
      body
    );
  }

  declineAppointment(
    patientID: any,
    doctorID: any,
    hospitalStaffID: any,
    date: any,
    time: any
  ): Observable<any> {
    const body = {
      hospitalStaffID: hospitalStaffID,
      patientID: patientID,
      doctorID: doctorID,
      date: date,
      time: time,
    };
    return this.http.post(
      SERVER_API + '/api/hospitalStaff/patient/appointment/decline',
      body
    );
  }
  // Patient Record

  viewPatientRecord(id: any): Observable<any> {
    return this.http.get(SERVER_API + '/api/doctor/patient/records/' + id);
  }

  createPatientRecord(
    patientID: any,
    record: any,
    date: any,
    inputter: any
  ): Observable<any> {
    const body = {
      patientID: patientID,
      record: record,
      date: date,
      inputter: inputter,
    };
    return this.http.post(
      SERVER_API + '/api/hospitalStaff/record/create',
      body
    );
  }

  updatePatientRecord(
    patientID: any,
    record: any,
    date: any,
    recordID: any,
    inputter: any
  ): Observable<any> {
    const body = {
      patientID: patientID,
      record: record,
      date: date,
      recordID: recordID,
      inputter: inputter,
    };
    return this.http.post(
      SERVER_API + '/api/doctor/patient/record/update',
      body
    );
  }

  // Patient Diagnosis
  createPatientDiagnosis(
    patientID: any,
    doctorID: any,
    date: any,
    diagnosis: any
  ): Observable<any> {
    const body = {
      patientID: patientID,
      doctorID: doctorID,
      date: date,
      diagnosis: diagnosis,
    };
    return this.http.post(
      SERVER_API + '/api/doctor/patient/diagnosis/create',
      body
    );
  }

  // Update Diagnosis
  updatePatientDiagnosis(
    patientID: any,
    doctorID: any,
    old_date: any,
    new_date: any,
    diagnosis: any
  ): Observable<any> {
    const body = {
      patientID: patientID,
      doctorID: doctorID,
      old_date: old_date,
      new_date: new_date,
      diagnosis: diagnosis,
    };
    return this.http.post(
      SERVER_API + '/api/doctor/patient/diagnosis/update',
      body
    );
  }

  // Delete Diagnosis
  deletePatientDiagnosis(
    patientID: any,
    doctorID: any,
    date: any,
    diagnosis: any
  ): Observable<any> {
    const body = {
      patientID: patientID,
      doctorID: doctorID,
      date: date,
      diagnosis: diagnosis,
    };
    return this.http.post(
      SERVER_API + '/api/doctor/patient/diagnosis/delete',
      body
    );
  }

  // Create Patient Presciptions
  createPatientPrescription(
    patientID: any,
    doctorID: any,
    date: any,
    prescription: any
  ): Observable<any> {
    const body = {
      patientID: patientID,
      doctorID: doctorID,
      date: date,
      prescription: prescription,
    };
    return this.http.post(
      SERVER_API + '/api/doctor/patient/prescription/create',
      body
    );
  }

  // Get Patient Lab Report
  getPatientLabReport(patientID: any): Observable<any> {
    return this.http.get(
      SERVER_API + '/api/doctor/patient/report/' + patientID
    );
  }

  // Update Patient Profile
  updatePatientProfile(
    patientID: any,
    age: any,
    gender: any,
    address: any,
    phoneNumber: any,
    creditCard: any
  ): Observable<any> {
    const body = {
      patientID: patientID,
      age: age,
      gender: gender,
      address: address,
      phoneNumber: phoneNumber,
      creditCard: creditCard,
    };
    return this.http.post(SERVER_API + '/api/patient/profile/update', body);
  }

  // Fetch List of All Doctors

  fetchAllDoctors() {
    this.http.get(SERVER_API + '/api/fetchAllDoctors').subscribe(
      (res) => (this.doctors = res),
      (error) => console.log(error)
    );
  }

  // Recommend Lab Test

  recommendLabTest(
    patientID: any,
    recommender: any,
    dateRecommended: any,
    testName: any,
    status: any
  ): Observable<any> {
    const body = {
      patientID: patientID,
      recommender: recommender,
      dateRecommended: dateRecommended,
      testName: testName,
      status: status,
    };
    return this.http.post(SERVER_API + '/api/doctor/labtest/create', body);
  }

  // Fetch All Lab tests
  fetchAllLabTests(): Observable<any> {
    return this.http.get(SERVER_API + '/api/labstaff/fetchAllLabTests');
  }

  // Update the Lab Status
  updateLabRequest(
    patientID: any,
    recommender: any,
    dateRecommended: any,
    testName: any,
    status: any
  ): Observable<any> {
    const body = {
      patientID: patientID,
      recommender: recommender,
      dateRecommended: dateRecommended,
      testName: testName,
      status: status,
    };
    return this.http.post(SERVER_API + '/api/labstaff/labtest/update', body);
  }

  // Update lab test data
  updateLabReportData(
    patientID: any,
    recommender: any,
    dateRecommended: any,
    testName: any,
    status: any,
    record: any,
    inputter: any,
    dateFilled: any
  ): Observable<any> {
    const body = {
      patientID: patientID,
      recommender: recommender,
      dateRecommended: dateRecommended,
      testName: testName,
      status: status,
      record: record,
      inputter: inputter,
      dateFilled: dateFilled,
    };
    return this.http.post(
      SERVER_API + '/api/labstaff/labtest/report/update',
      body
    );
  }

  // Delete lab test data
  deleteLabReportData(
    patientID: any,
    recommender: any,
    dateRecommended: any,
    testName: any
  ): Observable<any> {
    const body = {
      patientID: patientID,
      recommender: recommender,
      dateRecommended: dateRecommended,
      testName: testName,
    };
    return this.http.post(
      SERVER_API + '/api/labstaff/labtest/report/delete',
      body
    );
  }

  updatePatientAppointment(
    patientID: any,
    doctorID: any,
    approver: any,
    date: any,
    time: any,
    status: any,
    amount: any = null
  ): Observable<any> {
    const body = {
      patientID: patientID,
      doctorID: doctorID,
      date: date,
      time: time,
      approver: approver,
      status: status,
      amount: amount,
    };
    return this.http.post(SERVER_API + '/api/appointment/update', body);
  }

  createTransaction(
    patientID: any,
    date: any,
    status: any,
    transactionAmount: any
  ): Observable<any> {
    const body = {
      patientID: patientID,
      date: date,
      status: status,
      transactionAmount: transactionAmount,
    };
    return this.http.post(SERVER_API + '/api/transaction/create', body);
  }

  updateTransaction(transactionID: any, status: any): Observable<any> {
    const body = {
      transactionID: transactionID,
      status: status,
    };
    return this.http.post(SERVER_API + '/api/transaction/update', body);
  }

  fetchAllTransactions(): Observable<any> {
    return this.http.get(
      SERVER_API + '/api/hospitalStaff/fetachAllTransactions'
    );
  }

  fetchTransactionOfPatient(patientID: any): Observable<any> {
    return this.http.get(SERVER_API + '/api/patient/transaction/' + patientID);
  }

  fetchAllBills(): Observable<any> {
    return this.http.get(SERVER_API + '/api/hospitalStaff/fetchAllBills');
  }

  fetchBillsOfPatient(patientID: any): Observable<any> {
    return this.http.get(SERVER_API + '/api/patient/bills/' + patientID);
  }

  createBills(
    patientID: any,
    transactionID: any,
    service: any,
    amount: any,
    status: any,
    date: any
  ): Observable<any> {
    const body = {
      patientID: patientID,
      transactionID: transactionID,
      service: service,
      amount: amount,
      status: status,
      date: date,
    };
    return this.http.post(SERVER_API + '/api/hospitalStaff/bill/create', body);
  }

  patientInsuranceClaim(
    transactionID: any,
    dateOfRequest: any,
    claimedAmount: any
  ): Observable<any> {
    const body = {
      dateOfRequest: dateOfRequest,
      transactionID: transactionID,
      claimedAmount: claimedAmount,
    };
    return this.http.post(
      SERVER_API + '/api/patient/insurance/claim/insert',
      body
    );
  }

  fetchAllUsers(): Observable<any> {
    return this.http.get(SERVER_API + '/api/admin/users');
  }

  deleteUser(userID: any): Observable<any> {
    return this.http.get(SERVER_API + '/api/admin/delete/user/' + userID);
  }

  updateUser(
    userID: any,
    accountType: any,
    name: any,
    email:any
  ): Observable<any> {
    const body = {
      userID: userID,
      accountType: accountType,
      name: name,
      email:email
    };
    return this.http.post(
      SERVER_API + '/api/admin/delete/user/update',
      body
    );
  }
}
