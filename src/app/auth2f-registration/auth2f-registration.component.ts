import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-auth2f-registration',
  templateUrl: './auth2f-registration.component.html',
  styleUrls: ['./auth2f-registration.component.css']
})
export class Auth2fRegistrationComponent implements OnInit {
  @Input() email: string = '';
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  qrCode = true;
  @Output() authStatusEvent = new EventEmitter<string>();
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.register2fAuth(this.email).subscribe(
      data => {
        console.log(data);
        this.qrCode = data.value;
      },
      err => {
        console.error(err);
      }
    );
  }

  onSubmit(): void {
    this.authService.validate2fAuth(this.email,this.form.otp).subscribe(
      data => {
        console.log('Validate2fAuth',data);
        this.authStatusEvent.emit(data);
      },
      err => {
        console.error(err);
        this.authStatusEvent.emit(err);
      }
    );
  }

}
