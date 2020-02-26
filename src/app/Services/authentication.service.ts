import { User } from './../Modules/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public err: string;
  public user: Observable<firebase.User>;
  private userData: firebase.User

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) {
    this.user = firebaseAuth.authState;
    firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
      } else {
        this.userData = null;
      }
    });
  }

  public signUp(username: string, email: string, password: string): void {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        //this.sendVerificationMail();
        this.firestore.doc('users/' + this.userData.uid).set({
          collections: [],
          username: username
        });
        this.router.navigate(['user']);
      })
      .catch((error) => {
        this.err = error;
        console.log(error);
      });
  }

  public signIn(email: string, password: string): void {
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

  public signOut() {
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

  public getUser() {
    return this.firestore.doc<User>('users/' + this.userData.uid).snapshotChanges();
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

  private sendVerificationMail() {
    return this.firebaseAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
}
