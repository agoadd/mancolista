import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Album } from './../Modules/album';
import { Sticker } from './../Modules/sticker';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private albums: Array<Album>;
  private stickers: Array<Sticker>;
  
  constructor(private firestore: AngularFirestore) {
    this.albums = Array<Album>();
    this.stickers = Array<Sticker>();
  }

  private getStickers(searchValue): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('stickers', ref => ref.where("album", "==", searchValue)).snapshotChanges();
  }

  public getAlbums(): Array<Album> {
    this.firestore.collection<Album>('albums').snapshotChanges().subscribe(data => {
      data.forEach(element => {
        let album = new Album();
        album.id = element.payload.doc.id;
        album.name = element.payload.doc.data().name;
        this.getStickers(album.id).subscribe(sticker => {
          album.stickers = sticker.map(e => {
            return {
              ...e.payload.doc.data() as Sticker
            }
          });
        });
        this.albums.push(album);
      });
    });
    return this.albums;
  }

  // Prova orrimizzazione
  // public getAlbums(): Array<Album> {
  //   this.firestore.collection<Album>('albums').snapshotChanges().subscribe(data => {
  //     this.albums = data.map(element => {
  //       return {
  //         id: element.payload.doc.id,
  //         ...element.payload.doc.data()
  //       }
  //     });
  //     this.albums.forEach(album => {
  //       this.getStickers(album.id).subscribe(data => {
  //         this.albums.find(e => e.id = album.id).stickers = data.map(element => {
  //           return {
  //             ...element.payload.doc.data() as Sticker
  //           }
  //         });
  //       });
  //     });
  //   });
  //   return this.albums;
  // }
}
