import { CollectionSticker } from './../Modules/collectionSticker';
import { Collection } from './../Modules/collection';
import { User } from './../Modules/user';
import { Sticker } from './../Modules/sticker';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Album } from './../Modules/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  constructor(private firestore: AngularFirestore) { }

  public getAlbums(): Observable<DocumentChangeAction<Album>[]> {
    return this.firestore.collection<Album>('albums').snapshotChanges();
  }

}
