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
    return this.firestore.collection<Collection>('users/' + this.authService?.userId + '/collections').snapshotChanges();
  }

  public getCollection(collectionId: String) {
    return this.firestore.doc<Collection>('users/' + this.authService?.userId + '/collections/' + collectionId).snapshotChanges();
  }

  public reset(sticker: CollectionSticker, collection: Collection) {
    var newSticker = { ...sticker } as CollectionSticker
    newSticker.quantity = -1
    this.updateSticker(sticker, newSticker, collection)
  }

  public increment(sticker: CollectionSticker, collection: Collection) {
    var newSticker = { ...sticker } as CollectionSticker
    newSticker.quantity++
    this.updateSticker(sticker, newSticker, collection)
  }

  public decrement(sticker: CollectionSticker, collection: Collection) {
    var newSticker = { ...sticker } as CollectionSticker
    newSticker.quantity--
    this.updateSticker(sticker, newSticker, collection)
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
    this.firestore.doc<Collection>('users/' + this.authService?.userId + '/collections/' + collection.id).delete()
  }

  private addCollection(collection: Collection) {
    this.firestore.collection('users/' + this.authService.userId + '/collections').ref.where('album.id', '==', collection.album.id).get()
      .then(querySnapshot => {
        if (querySnapshot.size == 0) {
          this.firestore.collection('users/' + this.authService.userId + '/collections').add({ ...collection })
        }
      });
  }


  private updateSticker(sticker: CollectionSticker, newSticker: CollectionSticker, collection: Collection) {
    this.firestore.doc<Collection>('users/' + this.authService?.userId + '/collections/' + collection.id).ref.get()
      .then(doc => {
        doc.ref.update({
          stickers: firebase.firestore.FieldValue.arrayRemove(sticker)
        })
        doc.ref.update({
          stickers: firebase.firestore.FieldValue.arrayUnion(newSticker)
        })
      });
  }


}
