import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string;

  constructor(public authService: AuthenticationService) { }

  public resetPassword(): void {
    this.authService.forgotPassword(this.email);
  }

  ngOnInit() {
  }
}
