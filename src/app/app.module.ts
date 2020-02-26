import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { AlbumComponent } from './components/album/album.component';
import { UserComponent } from './Components/user/user.component';
import { CollectionComponent } from './Components/collection/collection.component';

import { environment } from '../environments/environment';

@NgModule({
   declarations: [
      AppComponent,
      AlbumComponent,
      UserComponent,
      CollectionComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabaseModule
   ],
   providers: [AngularFirestore],
   bootstrap: [AppComponent]
})
export class AppModule { }
