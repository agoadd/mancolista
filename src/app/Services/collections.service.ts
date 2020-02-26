import { Collection } from 'src/app/Modules/collection';
import { Injectable } from '@angular/core';
import { Album } from '../Modules/album';
import { CollectionSticker } from '../Modules/collectionSticker';
import { User } from '../Modules/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  constructor(private firestore: AngularFirestore) { }

  getCompletamento(collection: Collection) {
    let tot = collection.stickers.length
    let celo = collection.stickers.filter(s => s.quantity >= 0).length
    return celo / tot
  }

  getCollections() {
    let userID = localStorage.getItem('userId');
    return this.firestore.doc<User>('/users/' + userID).snapshotChanges();
  }

  resetta(sticker: CollectionSticker, collectionId: String) {
    // let user: User = JSON.parse(localStorage.getItem('user'));
    // let userID = localStorage.getItem('userId');
    // user.collections.forEach(c => {
    //   if (c.album.id == collectionId) {
    //     c.stickers.forEach(s => {
    //       if (s.code == sticker.code) {
    //         s.quantity = -1;
    //       }
    //     })
    //   }
    // })
    // this.firestore.doc('/users/' + userID).set(Object.assign({}, user))
    sticker.quantity = -1;
  }
  decrementa(sticker: CollectionSticker, collectionId: String) {
    // let user: User = JSON.parse(localStorage.getItem('user'));
    // let userID = localStorage.getItem('userId');
    // user.collections.forEach(c => {
    //   if (c.album.id == collectionId) {
    //     c.stickers.forEach(s => {
    //       if (s.code == sticker.code) {
    //         s.quantity--;
    //       }
    //     })
    //   }
    // })
    // this.firestore.doc('/users/' + userID).set(Object.assign({}, user))
    sticker.quantity--;
  }
  incrementa(sticker: CollectionSticker, collectionId: String) {
    // let user: User = JSON.parse(localStorage.getItem('user'));
    // let userID = localStorage.getItem('userId');
    // user.collections.forEach(c => {
    //   if (c.album.id == collectionId) {
    //     c.stickers.forEach(s => {
    //       if (s.code == sticker.code) {
    //         s.quantity++;
    //       }
    //     })
    //   }
    // })
    // this.firestore.doc('/users/' + userID).set(Object.assign({}, user))
    sticker.quantity++;
  }

  public addCollectionToUser(album: Album) {
    let collection = new Collection();
    collection.album.id = album.id
    collection.album.name = album.name
    collection.album.year = album.year
    collection.album = Object.assign({}, collection.album)
    album.stickers.forEach(element => {
      let cs = new CollectionSticker();
      cs.code = element.code
      cs.description = element.description
      collection.stickers.push(cs)
    });
    collection = Object.assign({}, collection)
    collection.stickers = collection.stickers.map((obj) => { return Object.assign({}, obj) })
    let user: User = JSON.parse(localStorage.getItem('user'));
    let userID = localStorage.getItem('userId');
    let collections = user.collections
    collections.push(collection);
    user.collections = collections.map((obj) => { return Object.assign({}, obj) })
    this.firestore.doc('/users/' + userID).set(Object.assign({}, user))
  }
}
