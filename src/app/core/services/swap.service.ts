import { Collection } from './../../modules/collection/collection';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { User } from 'src/app/modules/user/user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapService {

  private userList = new Array<User>()
  public users = new Subject<Array<User>>();

  constructor(private firestore: AngularFirestore, public authService: AuthenticationService) { }

  public getUsers(collection: Collection) {
    this.userList = new Array<User>()
    this.firestore.collection<User>('users').get().subscribe(users => {
      users.docs.forEach(u => {
        if (u.id != this.authService.userId) {
          let user = { id: u.id, ...u.data() } as User
          this.getAlbums(user, collection)
        }
      })
      this.users.next(this.userList)
    })
  }
  public getAlbums(user: User, collection: Collection) {
    let stickerCode = collection.stickers.filter(s => { return s.quantity <= 0 }).map(s => s.code)
    console.log(stickerCode)
    this.firestore.collection<Collection>('users/' + user.id + '/collections').ref.where('album.id', '==', collection.album.id).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let c = { id: doc.id, ...doc.data() } as Collection
          c.stickers = c.stickers.filter(s => { return s.quantity >= 2 && stickerCode.includes(s.code) })
          console.log(c.stickers)
          user.collections = new Array<Collection>()
          user.collections.push(c)
          this.userList.push(user)
        })
      });
  }
}

