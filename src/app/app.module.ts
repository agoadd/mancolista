import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { SigninComponent } from './core/authentication/components/signin/signin.component';
import { ForgotPasswordComponent } from './core/authentication/components/forgot-password/forgot-password.component';
import { AlbumComponent } from './modules/album/component/album.component';
import { UserComponent } from './modules/user/component/user.component';
import { CollectionComponent } from './modules/collection/component/collection.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { DialogComponent } from './shared/components/dialog/dialog.component';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      SigninComponent,
      ForgotPasswordComponent,
      AlbumComponent,
      UserComponent,
      CollectionComponent,
      PageNotFoundComponent,
      DialogComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
   ],
   entryComponents: [DialogComponent],
   providers: [AngularFirestore],
   bootstrap: [AppComponent]
})
export class AppModule { }