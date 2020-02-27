import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { User } from '../Modules/user';
import { Album } from '../Modules/album';
import { Collection } from '../Modules/collection';
import { CollectionSticker } from '../Modules/collectionSticker';

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

  /***** scrivere su db *****/
  public reset(sticker: CollectionSticker) {
    sticker.quantity = -1;
  }

  public remove(sticker: CollectionSticker) {
    sticker.quantity--;
  }

  public add(sticker: CollectionSticker) {
    sticker.quantity++;
  }
  /**************************/

  public addCollectionToUser(album: Album) {
    let user = this.authService.userData;
    let userCollection = user.collections.find((collection) => collection.album.id == album.id);
    if (!userCollection) {
      let collection = new Collection();
      collection.setCollection(album, album.stickers);
      user.collections.push(collection);;
      this.firestore.doc('users/' + user.id).set({user});
    }
  }
}
