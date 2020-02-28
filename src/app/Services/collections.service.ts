import { Collection } from './../Modules/collection';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { User } from '../Modules/user';
import { Album } from '../Modules/album';
import { CollectionSticker } from '../Modules/collectionSticker';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  constructor(private firestore: AngularFirestore, public authService: AuthenticationService) { }

  public getProgress(collection: Collection) {
    let tot = collection.stickers.length;
    let celo = collection.stickers.filter((sticker) => sticker.quantity >= 0).length;
    return celo / tot;
  }

  public getCollections() {
    return this.firestore.doc<User>('users/' + this.authService.userData.id).valueChanges();
  }

  public reset(sticker: CollectionSticker, collection: Collection) {
    let newCollection = collection
    this.removeCollection(collection)
    newCollection.stickers.forEach(s => {
      if (s.code == sticker.code) {
        s.quantity = -1;
      }
    })
    this.addCollection(newCollection)
  }

  public increment(sticker: CollectionSticker, collection: Collection) {
    let newCollection = collection
    this.removeCollection(collection)
    newCollection.stickers.forEach(s => {
      if (s.code == sticker.code) {
        s.quantity++;
      }
    })
    this.addCollection(newCollection)
  }

  public decrement(sticker: CollectionSticker, collection: Collection) {
    let newCollection = collection
    this.removeCollection(collection)
    newCollection.stickers.forEach(s => {
      if (s.code == sticker.code) {
        s.quantity--;
      }
    })
    this.addCollection(newCollection)
  }

  public addCollectionToUser(album: Album) {
    let collection = new Collection();
    collection = collection.toFirebase(album, album.stickers);
    this.addCollection(collection)
  }

  public removeCollectionToUSer(collection: Collection) {
    this.removeCollection(collection)
  }

  private removeCollection(collection: Collection) {
    this.firestore.collection('users').doc(this.authService.userData.id).update({
      collections: firebase.firestore.FieldValue.arrayRemove({ ...collection })
    });
  }
  private addCollection(collection: Collection) {
    this.firestore.collection('users').doc(this.authService.userData.id).update({
      collections: firebase.firestore.FieldValue.arrayUnion({ ...collection })
    });
  }

}
