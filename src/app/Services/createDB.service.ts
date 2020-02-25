import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Album } from '../Modules/album';
import { Sticker } from '../Modules/sticker';
import { User } from '../Modules/user';
import { Collection } from '../Modules/collection';
import { CollectionSticker } from '../Modules/collectionSticker';

@Injectable({
  providedIn: 'root'
})
export class CreateDBService {

  constructor(private firestore: AngularFirestore) { }

  public Init() {
    this.setAlbums();
    this.setUsers();
  }

  private setAlbums() {
    for (let i = 0; i < 3; i++) {
      let album = new Album()
      album.name = "Album " + i;
      album.year = "2019";
      album.stickers = this.getStickers(album.name).map((obj) => { return Object.assign({}, obj) });
      this.firestore.collection('albums').add(Object.assign({}, album))
    }
  }

  private getStickers(album: string) {
    let result = new Array<Sticker>()
    for (let i = 0; i < 3; i++) {
      let sticker = new Sticker()
      sticker.code = album + " F " + i
      sticker.description = "FIGURINA " + i
      result.push(sticker)
    }
    return result;
  }

  private setUsers() {
    for (let i = 0; i < 2; i++) {
      let user = new User()
      user.username = "User " + i
      user.collections = this.getCollection().map((obj) => { return Object.assign({}, obj) });
      this.firestore.collection('users').add(Object.assign({}, user))
    }
  }

  private getCollection() {
    let result = new Array<Collection>()
    for (let i = 0; i < 1; i++) {
      let collection = new Collection()
      collection.album.name = "Album " + i;
      collection.album.year = "2019";
      collection.ownedStickers = new Array<CollectionSticker>()
      let cs = new CollectionSticker()
      cs.code = collection.album.name + " F " + i
      cs.quantity = 2
      collection.album = Object.assign({}, collection.album)
      collection.ownedStickers.push(cs)
      collection.ownedStickers = collection.ownedStickers.map((obj) => { return Object.assign({}, obj) });
      result.push(collection)
    }
    return result;
  }

}
