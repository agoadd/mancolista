import { AlbumService } from './../../Services/album.service';
import { Figurina } from './../../Modules/figurina';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit {

  public figurine: Figurina[];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.firestore.collection<Figurina>('/figurine').snapshotChanges().subscribe(data => {
      this.figurine = data.map(a => {
        return {
          id: a.payload.doc.id,
          ...a.payload.doc.data()
        } as Figurina;
      })
    })
  }
}