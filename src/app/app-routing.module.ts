import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './Components/user/user.component';
import { AlbumComponent } from './Components/album/album.component';
import { SigninComponent } from './Components/signin/signin.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { AuthorizationGuard } from './Guards/authorization.guard';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full', },
  { path: 'home', component: SigninComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'reset-password', component: ForgotPasswordComponent },
  { path: 'user/:id', component: UserComponent, canActivate: [AuthorizationGuard] },
  { path: 'album', component: AlbumComponent, canActivate: [AuthorizationGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
