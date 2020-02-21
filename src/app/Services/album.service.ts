import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  constructor(private firestore: AngularFirestore) { }

  public getStickers(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('stickers').snapshotChanges();
  }

  // public getStickers(id: string) {
  //   return this.firestore.doc('albums/' + id).snapshotChanges();
  // }

  // public setAlbum(configuration: string): void {
  //   // todo: setta l'album sul db (magari usando un file)
  // }
}

