import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumComponent } from './components/album/album.component';
import { AngularFirestore } from '@angular/fire/firestore';

const config = {
   apiKey: "AIzaSyBWSShZBgrgA3UVdmNt9T_YkjjZvMHTc2A",
   authDomain: "mancolista-db.firebaseapp.com",
   databaseURL: "https://mancolista-db.firebaseio.com",
   projectId: "mancolista-db",
   storageBucket: "mancolista-db.appspot.com",
   messagingSenderId: "846235428676",
};

@NgModule({
   declarations: [
      AppComponent,
      AlbumComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      AngularFireModule.initializeApp(config),
   ],
   providers: [AngularFirestore],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
