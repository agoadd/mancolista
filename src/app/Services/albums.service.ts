import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Album } from './../Modules/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  constructor(private firestore: AngularFirestore) { }

  public getAlbums() {
    return this.firestore.collection<Album>('albums').valueChanges();
  }
}
