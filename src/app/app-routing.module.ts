import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './Components/user/user.component';
import { AlbumComponent } from './Components/album/album.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthorizationGuard } from './Guards/authorization.guard';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', },
  { path: 'home', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthorizationGuard] },
  { path: 'album', component: AlbumComponent, canActivate: [AuthorizationGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
