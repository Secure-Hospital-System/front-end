import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  patientID = 46;

  constructor() { }
  signOut(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user:string): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const userKey = sessionStorage.getItem(USER_KEY);
    if (userKey)  return JSON.parse(userKey);
    else return "Error"
  }

  public getUserID(){
    // return 46;
    // if(this.getUser() == "Error"){
    //   return "46";
    // }
    return this.getUser().id;
  }

  public setPatientID(id:any){
    this.patientID = id;
  }

  public getPatientID(){
    if(this.getUser().roles.includes('ROLE_PATIENT')){
      return this.getUser().id;
    }
    return this.patientID;
  }
}