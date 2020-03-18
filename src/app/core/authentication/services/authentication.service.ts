import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { User } from './../../../modules/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public errorMessage: string;
  public user: Observable<firebase.User>;
  private userData: firebase.User;
  private params = {
    'auth/user-not-found': 'Inserire un indirizzo e-mail valido',
    'auth/invalid-email': 'Inserire un indirizzo e-mail valido',
    'auth/wrong-password': 'La password è errata',
    'auth/weak-password': 'La password deve essere di almeno 6 caratteri',
    'auth/email-already-in-use': 'Questo indirizzo email è gia stato ustao per un altro account',
    'auth/verify-email': 'Clicca sul link di verifica che hai ricevuto per email per effettuare il login'
  };

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) {
    firebase.auth().useDeviceLanguage();
    this.firebaseAuth.auth.onAuthStateChanged(userData => {
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
        this.errorMessage = this.params[error.code];
      });
  }

  public signIn(email: string, password: string): void {
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then((value) => {
        if (!value.user.emailVerified) throw { code: "auth/verify-email" };
        this.user = this.firebaseAuth.authState;
        this.router.navigate(['user']);
      })
      .catch((error) => {
        this.errorMessage = this.params[error.code];
      });
  }

  public sendVerificationMail(): void {
    this.firebaseAuth.auth.currentUser.sendEmailVerification();
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

  private setUserRole(): void {
    if (this.userData) this.userData['role'] = (!!environment.admins.filter(x => x.email == this.userData.email) ? 'admin' : 'user');
  }

  get isLoggedIn(): boolean {
    return (!!this?.userData);
  }
  get isAdmin(): boolean {
    if (this.isLoggedIn) return this.userData['role'] == 'admin';
    return false;
  }
  get userId(): string {
    return this.userData.uid;
  }
}
