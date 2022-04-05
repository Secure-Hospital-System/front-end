import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  isOTPSucess = false;
  token: string|undefined;
  email = '';
  tokenError = false;
  private tokenData: any;
  errorMessage = '';
  roles: string[] = [];
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {
    this.token = undefined;
  }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.isOTPSucess = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onSubmit(): void {
    // if(this.form && this.token){
      this.tokenError = false;
      this.authService.login(this.form).subscribe(
        (data) => {
          this.tokenData = data;
          this.email = data.email;
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.errorMessage = '';
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    // }else {
    //   this.tokenError = true;
    // }

  }
  reloadPage(): void {
    window.location.reload();
  }

  auth2fCheck(status: any) {
    if (status == true) {
      this.isOTPSucess = status;
      this.authService.otpStatus = status;
    } else {
      this.isOTPSucess = false;
      this.authService.otpStatus = false;
    }

    if (this.isOTPSucess) {
      this.errorMessage = '';
      this.tokenStorage.saveToken(this.tokenData?.accessToken);
      this.tokenStorage.saveUser(this.tokenData);
      this.roles = this.tokenStorage.getUser().roles;

      this.reloadPage();
    } else {
      this.errorMessage = 'Invalid OTP';
    }
    console.log('isOTPSucess:', status);
  }

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    console.debug(`Token [${this.token}] generated`);
  }
}
