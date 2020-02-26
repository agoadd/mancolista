import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../Services/authentication.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showLogin: boolean;
  showSignin: boolean;
  email: string;
  password: string;

  constructor(public authService: AuthenticationService) {
    this.showLogin = true;
    this.showSignin = false;
  }

  public toggle(): void {
    this.showLogin = !this.showLogin;
    this.showSignin = !this.showSignin;
  }

  public login(): void {
    this.authService.login(this.email, this.password)
    this.email = this.password = '';
  }

  public signup() {
    this.authService.signup(this.email, this.password)
    this.email = this.password = '';
  }

  // public logout(): void {
  //   console.log('User is successfully logged out.')
  //   this.authService.logout();
  // }

  ngOnInit() {
  }
}
