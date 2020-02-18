import { Figurina } from './../Modules/figurina';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private mancolista: Array<Figurina>;
  private celo: Array<Figurina>;
  private doppie: Array<Figurina>;

  constructor(private firestore: AngularFirestore) {
    this.mancolista = new Array<Figurina>();
    this.celo = new Array<Figurina>();
    this.doppie = new Array<Figurina>();
  }

  public getAlbum() {
    return this.firestore.collection('figurine').snapshotChanges();
  }

  public getMancolista(album: Array<Figurina>): Array<Figurina> {
    let mancanti = album.find(x => x.quantita == 0);
    if (mancanti) this.mancolista.push(mancanti);
    return this.mancolista;
  }

  public getCelo(album: Array<Figurina>): Array<Figurina> {
    let ce = album.find(x => x.quantita > 0);
    if (ce) this.celo.push(ce);
    return this.celo;
  }

  public getDoppie(album: Array<Figurina>): Array<Figurina> {
    let doppie = album.find(x => x.quantita > 1);
    if (doppie) this.doppie.push(doppie);
    return this.doppie;
  }

  public add(figurina: Figurina): void {
    figurina.quantita++;
    if ((figurina.quantita > 1) && (this.doppie.find(x => x.codice == figurina.codice) == null)) this.doppie.push(figurina);
    else if (figurina.quantita == 1) this.celo.push(figurina);
  }

  public remove(figurina: Figurina): void {
    if (figurina.quantita == 0) return;
    figurina.quantita--;
    if ((figurina.quantita > 1) && (this.doppie.find(x => x.codice == figurina.codice) == null)) this.doppie.push(figurina);
    else if (figurina.quantita == 1) {
      let index = this.doppie.indexOf(figurina, 0)
      this.doppie.splice(index, 1);
    } else if (figurina.quantita == 0) {
      let index = this.celo.indexOf(figurina, 0)
      this.celo.splice(index, 1);
    }
  }
}

