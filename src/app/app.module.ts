import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { AlbumComponent } from './components/album/album.component';

import { environment } from '../environments/environment';

@NgModule({
   declarations: [
      AppComponent,
      AlbumComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      AngularFireModule.initializeApp(environment.fireBaseConfig),
      AngularFirestoreModule,
      AngularFireAuthModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
