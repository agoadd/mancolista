import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from '../authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(public authService: AuthenticationService, public router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const authenticated: Subject<boolean> = new Subject();
    this.authService.auth.onAuthStateChanged(user => {
      if (!user) {
        this.router.navigate(['signin']);
        authenticated.next(false);
      } else authenticated.next(true);
      authenticated.complete();
    });
    return authenticated;
  }
}