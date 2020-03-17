import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Album } from './../../modules/album/album';
import { CollectionSticker } from './../../modules/sticker/collectionSticker';
import { Collection } from './../../modules/collection/collection';
import { AuthenticationService } from '../authentication/services/authentication.service';

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
    return this.firestore.collection<Collection>('users/' + this.authService?.userId + '/collections').valueChanges();
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
    this.firestore.collection('users/' + this.authService.userId + '/collections').ref.where('album.id', '==', collection.album.id).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      });
  }

  private addCollection(collection: Collection) {
    this.firestore.collection('users/' + this.authService.userId + '/collections').add({ ...collection })
  }

  private updateSticker(sticker: CollectionSticker, newSticker: CollectionSticker, albumId: string) {
    this.firestore.collection('users/' + this.authService.userId + '/collections').ref.where('album.id', '==', albumId).get()
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
