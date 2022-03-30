import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  isOTPSucess = false;
  email = '';
  private tokenData:any;
  errorMessage = '';
  roles: string[] = [];
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.isOTPSucess = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenData = data;
        this.email = data.email;
        this.isLoginFailed = false;
        this.isLoggedIn = true;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }

  auth2fCheck(status:any) {
    if(status == true){
      this.isOTPSucess = status;
      this.authService.otpStatus = status;
    }else {
      this.isOTPSucess = false;
      this.authService.otpStatus = false;
    }
   
    if(this.isOTPSucess){
      this.errorMessage = '';
      this.tokenStorage.saveToken(this.tokenData?.accessToken);
      this.tokenStorage.saveUser(this.tokenData);
      this.roles = this.tokenStorage.getUser().roles;
      
      this.reloadPage();
    }else {
      this.errorMessage = 'Invalid OTP';
    }
    console.log('isOTPSucess:',status);
}
}