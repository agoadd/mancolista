import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './modules/user/component/user.component';
import { AlbumComponent } from './modules/album/component/album.component';
import { NewAlbumComponent } from './modules/new-album/component/new-album.component';
import { SigninComponent } from './core/authentication/components/signin/signin.component';
import { ForgotPasswordComponent } from './core/authentication/components/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AuthorizationGuard } from './core/guards/authorization.guard';
import { NavigationGuard } from './core/guards/navigation.guard';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'home', component: UserComponent, canActivate: [AuthorizationGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'reset-password', component: ForgotPasswordComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthorizationGuard] },
  { path: 'album', component: AlbumComponent },
  { path: 'new-album', component: NewAlbumComponent, canActivate: [NavigationGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
