import { CollectionSticker } from './../Modules/collectionSticker';
import { Sticker } from './../Modules/sticker';
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
    // let newCollection = collection
    // this.removeCollection(collection)
    // newCollection.stickers.forEach(s => {
    //   if (s.code == sticker.code) {
    //     s.quantity = -1;
    //   }
    // })
    // this.addCollection(newCollection)
  }

  public increment(sticker: CollectionSticker, collection: Collection) {
    var newSticker = { ...sticker } as CollectionSticker
    newSticker.quantity++
    var query = this.firestore.collection('users/' + this.authService.userData.id + '/collections').ref.where('album.id', '==', collection.album.id);
    query.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.update({
          stickers: firebase.firestore.FieldValue.increment(1)
        })
      });
    });
  }

  public decrement(sticker: CollectionSticker, collection: Collection) {
    var newSticker = { ...sticker } as CollectionSticker
    newSticker.quantity++
    var query = this.firestore.collection('users/' + this.authService.userData.id + '/collections').ref.where('album.id', '==', collection.album.id);
    query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          stickers: firebase.firestore.FieldValue.arrayRemove({ sticker })
        })
      });
    });
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
    var query = this.firestore.collection('users/' + this.authService.userData.id + '/collections').ref.where('album.id', '==', collection.album.id);
    query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
  }

  private addCollection(collection: Collection) {
    this.firestore.collection('users').doc(this.authService.userData.id).collection('collections').doc('cazzo').set({ album: collection.album });

    let stickersRef = this.firestore.collection('users').doc(this.authService.userData.id).collection('collections').doc('cazzo').collection('stickers')
    collection.stickers.forEach(sticker => {
      stickersRef.add({ sticker: sticker });
    });
  }
}
