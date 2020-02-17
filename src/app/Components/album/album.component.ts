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
  public figurine: Array<Figurina>;
  public mancolista: Array<Figurina>;
  public celo: Array<Figurina>;
  public doppie: Array<Figurina>;
  private service: AlbumService;
  private firestore: AngularFirestore

  constructor(service: AlbumService, firestore: AngularFirestore) {
    this.service = service;
    // this.firestore.collection<Figurina>('/figurine').snapshotChanges().subscribe(data => {
    //   this.figurine = data.map(a => {
    //     return {
    //       id: a.payload.doc.id,
    //       ...a.payload.doc.data()
    //     } as Figurina;
    //   })
    // });
  }

  ngOnInit() {
    this.figurine = this.service.getAlbum();
    this.celo = this.service.getCelo();
    this.doppie = this.service.getDoppie();
  }

  public add(figurina: Figurina): void {
    this.service.add(figurina);
  }

  public remove(figurina: Figurina): void {
    this.service.remove(figurina);
  }
}