import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Album } from './../../modules/album/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  constructor(private firestore: AngularFirestore) { }

  public getAlbums(): Observable<DocumentChangeAction<Album>[]> {
    return this.firestore.collection<Album>('albums').snapshotChanges();
  }

  public setAlbum(album: Album): void {
    this.firestore.collection('albums/' + album.id).add({ ...album });
  }
}
