import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Input, Output, EventEmitter } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';


@Component({
  selector: 'app-auth2f',
  templateUrl: './auth2f.component.html',
  styleUrls: ['./auth2f.component.css']
})
export class Auth2fComponent implements OnInit {
  @Input() email: string = '';
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;

  @Output() authStatusEvent = new EventEmitter<string>();
  constructor(private authService: AuthService,private token: TokenStorageService) { }

  
  ngOnInit(): void {
    // this.currentUser = this.token.getUser();
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
