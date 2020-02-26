import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { SigninComponent } from './Components/signin/signin.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { AlbumComponent } from './Components/album/album.component';
import { UserComponent } from './Components/user/user.component';
import { CollectionComponent } from './Components/collection/collection.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';

@NgModule({
   declarations: [
      AppComponent,
      SigninComponent,
      ForgotPasswordComponent,
      AlbumComponent,
      UserComponent,
      CollectionComponent,
      PageNotFoundComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      MaterialModule,
      FormsModule,
      BrowserAnimationsModule,
   ],
   providers: [AngularFirestore],
   bootstrap: [AppComponent]
})
export class AppModule { }