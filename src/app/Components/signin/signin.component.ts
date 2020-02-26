import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../Services/authentication.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  showSignIn: boolean;
  showSignUp: boolean;
  username: string;
  email: string;
  password: string;

  constructor(public authService: AuthenticationService) {
    this.showSignIn = true;
    this.showSignUp = false;
  }

  public toggle(): void {
    this.showSignIn = !this.showSignIn;
    this.showSignUp = !this.showSignUp;
  }

  public signIn(): void {
    this.authService.signIn(this.email, this.password);
  }

  public signUp() {
    this.authService.signUp(this.username, this.email, this.password);
  }

  ngOnInit() {
  }
}