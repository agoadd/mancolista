import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { User } from './../Modules/user';
import { Observable } from 'rxjs';
import { CollectionSticker } from './../Modules/collectionSticker';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private missing: Array<CollectionSticker>
  private duplicates: Array<CollectionSticker>

  constructor(private firestore: AngularFirestore) { }

  public getUser(userId) {
    return this.firestore.doc<User>('users/'+userId).snapshotChanges();
  }
  public add(): void { }

  public remove(): void { }


  // public add(sticker: Sticker): void {
  //   sticker.quantity++;
  //   if ((sticker.quantity > 1) && (this.duplicates.find(x => x.code == sticker.code) == null)) this.duplicates.push(sticker);
  //   else if (sticker.quantity == 1) this.owned.push(sticker);
  // }

  // public remove(sticker: Sticker): void {
  //   if (sticker.quantity == 0) return;
  //   sticker.quantity--;
  //   if ((sticker.quantity > 1) && (this.duplicates.find(x => x.code == sticker.code) == null)) this.duplicates.push(sticker);
  //   else if (sticker.quantity == 1) {
  //     let index = this.duplicates.indexOf(sticker, 0)
  //     this.duplicates.splice(index, 1);
  //   } else if (sticker.quantity == 0) {
  //     let index = this.owned.indexOf(sticker, 0)
  //     this.owned.splice(index, 1);
  //   }
  // }
}
