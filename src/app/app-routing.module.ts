import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './Components/user/user.component';
import { AlbumComponent } from './Components/album/album.component';
import { SigninComponent } from './Components/signin/signin.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { AuthorizationGuard } from './Guards/authorization.guard';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'home', component: UserComponent, canActivate: [AuthorizationGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'reset-password', component: ForgotPasswordComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthorizationGuard] },
  { path: 'album', component: AlbumComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
