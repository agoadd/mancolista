import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { User } from './../Modules/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public err: string;
  public user: Observable<firebase.User>;
  public userData: User;
  private params = {
    'auth/user-not-found': 'Inserire un indirizzo e-mail valido',
    'auth/invalid-email': 'Inserire un indirizzo e-mail valido',
    'auth/wrong-password': 'La password è errata',
    'auth/weak-password': 'La password deve essere di almeno 6 caratteri',
    'auth/email-already-in-use':'Questo indirizzo email è gia stato ustao per un altro account'
  };

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) { }

  public signUp(username: string, email: string, password: string): void {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({
          displayName: username
        });
        //this.sendVerificationMail();
        this.firestore.doc('users/' + result.user.uid).set({
          collections: [],
          username: username
        });
        this.router.navigate(['signin']);
      })
      .catch((error) => {
        this.err = this.params[error.code];
      });
  }

  public signIn(email: string, password: string): void {
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then((value) => {
        this.user = this.firebaseAuth.authState;
        this.userData = new User();
        this.setUserData(value.user);
        this.router.navigate(['user']);
      })
      .catch((error) => {
        this.err = this.params[error.code];
      });
  }

  public signOut(): any {
    return this.firebaseAuth.auth.signOut().then(() => {
      this.userData = undefined;
      this.router.navigate(['home']);
    });
  }

  get isLoggedIn(): boolean {
    //return (user !== null && user.emailVerified !== false) ? true : false;
    return (this.userData !== undefined) ? true : false;
  }

  public getUser() {
    return this.firestore.doc<User>('users/' + this.userData.id).valueChanges();
  }

  public forgotPassword(passwordResetEmail): any {
    return this.firebaseAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  private sendVerificationMail(): any {
    return this.firebaseAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  private setUserData(userData: firebase.User) {
    this.userData.id = userData.uid;
    this.userData.username = userData.displayName;
  }

  public setUser(user: User) {
    let id = this.userData.id;
    this.userData = user;
    this.userData.id = id;
  }
}
