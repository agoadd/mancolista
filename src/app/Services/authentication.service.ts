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
  private usersService: UsersService;
  user: Observable<firebase.User>;
  err: string;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success! User is successfully registered.', value.user.email);
        //this.router.navigate(['user']);
      })
      .catch(error => {
        this.err = error.message;
        console.log('Something went wrong:', error);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('User successfully logged in!');
        localStorage.setItem('user', JSON.stringify(value.user));
        this.router.navigate(['user']);
      })
      .catch(error => {
        this.err = error.message;
        console.log('Something went wrong:', error);
      });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['home']);
    this.firebaseAuth.auth.signOut();
    this.user = null;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    //return (user !== null && user.emailVerified !== false) ? true : false;
    return (user !== null) ? true : false;
  }
}
