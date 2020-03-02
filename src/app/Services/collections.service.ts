import { Sticker } from './../Modules/sticker';
import { CollectionSticker } from './../Modules/collectionSticker';
import { Collection } from 'src/app/Modules/collection';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { Album } from '../Modules/album';
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
    return this.firestore.collection<Collection>('users/' + this.authService.userData.id + '/collections').valueChanges();
  }

  public reset(sticker: CollectionSticker, collection: Collection) {
    var newSticker = { ...sticker } as CollectionSticker
    newSticker.quantity = -1
    this.updateSticker(sticker, newSticker, collection.album.id)
  }

  public increment(sticker: CollectionSticker, collection: Collection) {
    var newSticker = { ...sticker } as CollectionSticker
    newSticker.quantity++
    this.updateSticker(sticker, newSticker, collection.album.id)
  }

  public decrement(sticker: CollectionSticker, collection: Collection) {
    var newSticker = { ...sticker } as CollectionSticker
    newSticker.quantity--
    this.updateSticker(sticker, newSticker, collection.album.id)
  }

  public addCollectionToUser(album: Album) {
    let collection = new Collection();
    collection = collection.toFirebase(album, album.stickers);
    this.addCollection(collection)
  }

  public removeCollectionFromUser(collection: Collection) {
    this.removeCollection(collection)
  }

  private removeCollection(collection: Collection) {
    this.firestore.collection('users/' + this.authService.userData.id + '/collections').ref.where('album.id', '==', collection.album.id).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      });
  }

  private addCollection(collection: Collection) {
    this.firestore.collection('users/' + this.authService.userData.id + '/collections').add({ ...collection })
  }

  private updateSticker(sticker: CollectionSticker, newSticker: CollectionSticker, albumId: string) {
    this.firestore.collection('users/' + this.authService.userData.id + '/collections').ref.where('album.id', '==', albumId).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            stickers: firebase.firestore.FieldValue.arrayRemove(sticker)
          })
          doc.ref.update({
            stickers: firebase.firestore.FieldValue.arrayUnion(newSticker)
          })
        });
      });
  }

}
