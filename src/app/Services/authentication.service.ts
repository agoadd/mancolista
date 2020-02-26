import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  err: string;
  user: Observable<firebase.User>;
  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private usersService: UsersService) {
    this.user = firebaseAuth.authState;
  }

  signUp(username: string, email: string, password: string) {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        //this.sendVerificationMail();
        this.usersService.add("pippo", result.user.uid);
        this.router.navigate(['user', result.user.uid]);
      })
      .catch((error) => {
        this.err = error;
        console.log(error);
      });
  }

  signIn(email: string, password: string) {
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then((value) => {
        localStorage.setItem('user', JSON.stringify(value.user));
        localStorage.setItem('userId', value.user.uid);
        this.router.navigate(['user', value.user.uid]);
      })
      .catch((error) => {
        this.err = error;
        console.log(error);
      });
  }

  signOut() {
    return this.firebaseAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    //return (user !== null && user.emailVerified !== false) ? true : false;
    return (user !== null) ? true : false;
  }

  private sendVerificationMail() {
    return this.firebaseAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  public forgotPassword(passwordResetEmail) {
    return this.firebaseAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error)
      });
  }
}
