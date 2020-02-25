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
    return this.firestore.doc<User>('users/' + userId).snapshotChanges();
  }
  public add(): void { }

  public remove(): void { }
}
