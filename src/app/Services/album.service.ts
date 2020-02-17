import { Figurina } from './../Modules/figurina';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private firestore: AngularFirestore) { }

  getFigurine() {
    return this.firestore.collection<Figurina>('/figurine').snapshotChanges()
  }

}

