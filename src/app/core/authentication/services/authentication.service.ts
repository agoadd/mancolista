import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable, Subject } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { User } from './../../../modules/user/user';
import { AuthErrors } from '../utils/auth-errors';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public errorMessage: string;
  public user: Observable<firebase.User>;
  private userData: firebase.User;

  constructor(public firebaseAuth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) {
    firebase.auth().useDeviceLanguage();
    this.firebaseAuth.auth.onAuthStateChanged(userData => {
      this.user = this.firebaseAuth.authState;
      this.userData = userData;
      this.setUserRole();
      this.errorMessage = undefined;
    });
  }

  public signUp(username: string, email: string, password: string): void {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({ displayName: username });
        this.sendVerificationMail();
        this.firestore.doc('users/' + result.user.uid).set({ username: username });
      })
      .catch((error) => {
        this.errorMessage = AuthErrors.params[error.code];
      });
  }

  public signIn(email: string, password: string): void {
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then((value) => {
        if (!value.user.emailVerified) throw { code: "auth/verify-email" };
        this.router.navigate(['user']);
      })
      .catch((error) => {
        this.errorMessage = AuthErrors.params[error.code];
      });
  }

  public signOut(): any {
    return this.firebaseAuth.auth.signOut().then(() => {
      this.router.navigate(['signin']);
    });
  }

  public getLoggedUser() {
    if (this.isLoggedIn) return this.firestore.doc<User>('users/' + this.userId).valueChanges();
  }

  public forgotPassword(email): any {
    return this.firebaseAuth.auth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private sendVerificationMail(): void {
    this.firebaseAuth.auth.currentUser.sendEmailVerification();
  }

  private setUserRole(): void {
    if (this.userData) {
      this.userData['role'] = (environment.admins.findIndex((x) => x.email == this.userData.email) >= 0 ? 'admin' : 'user');
    }
  }

  get auth(): firebase.auth.Auth {
    return this.firebaseAuth.auth;
  }

  get isLoggedIn(): Observable<boolean> {
    const authenticated: Subject<boolean> = new Subject();
    this.firebaseAuth.auth.onAuthStateChanged(user => {
      if (!user) authenticated.next(false);
      else authenticated.next(true);
      authenticated.complete();
    });
    return authenticated;
  }

  get isAdmin(): boolean {
    if (!this.userData) return false;
    return this.userData['role'] == 'admin';
  }

  get userId(): string {
    return this.userData.uid;
  }
}
