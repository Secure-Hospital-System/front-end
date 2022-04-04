import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const AUTH_API =
  'http://ec2-54-235-234-187.compute-1.amazonaws.com:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({
    // 'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private otpValue = false;
  constructor(private http: HttpClient) {}
  login(credentials: any): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username: credentials.username,
        password: credentials.password,
      },
      httpOptions
    );
  }

  register(user: any): Observable<any> {
    const body = {

    }
    return this.http.post(
      AUTH_API + 'signup',
      {
        name: user.username,
        username: user.email,
        email: user.email,
        password: user.password,
        address: user.address ? user.address : 'NA',
        phoneNumber: user.number ? user.number : 123423,
        age: user.number ? user.age : 50,
        gender: user.gender ? user.gender : 'Male',
        creditCard: user.cardNumber ? user.cardNumber : 1234567890,
        role: user.role ? [''+user.role] : ['patient']
      },
      httpOptions
    );
  }

  register2fAuth(id: any): Observable<any> {
    return this.http.get('http://18.233.8.27:8080/api/twofareg/' + id);
  }

  validate2fAuth(id: any, otp: any): Observable<any> {
    return this.http.get('http://18.233.8.27:8080/api/twofa/' + id + '/' + otp);
  }

  set otpStatus(status) {
    this.otpValue = status;
  }

  get otpStatus() {
    return this.otpValue;
  }
}
