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
  private userData: any

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) {
    this.user = firebaseAuth.authState;
  }

  public signUp(username: string, email: string, password: string): void {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        //this.sendVerificationMail();
        this.setUserData(result.user);
        this.firestore.doc('users' + result.user.uid).set({
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
        this.setUserData(value.user);
        this.router.navigate(['user']);
      })
      .catch((error) => {
        this.err = error;
        console.log(error);
      });
  }

  public signOut(): any {
    return this.firebaseAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
    });
  }

  get isLoggedIn(): boolean {
    //return (user !== null && user.emailVerified !== false) ? true : false;
    return (this.userData !== null) ? true : false;
  }

  public getUser(): any {
    return this.firestore.doc<User>('users/' + localStorage.getItem('userId')).snapshotChanges();
  }

  public forgotPassword(passwordResetEmail): any {
    return this.firebaseAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error)
      });
  }

  private sendVerificationMail(): any {
    return this.firebaseAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  
  private setUserData(userData: firebase.User) {
    this.userData = { uid: userData.uid };
    localStorage.setItem('userId', userData.uid);
  }
}
