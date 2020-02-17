import { Injectable, Component } from '@angular/core';
import { Figurina } from '../Modules/figurina';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private album: Array<Figurina>;
  private mancolista: Array<Figurina>;
  private celo: Array<Figurina>;
  private doppie: Array<Figurina>;

  constructor() {
    this.album = new Array<Figurina>();
    this.mancolista = new Array<Figurina>();
    this.celo = new Array<Figurina>();
    this.doppie = new Array<Figurina>();
  }

  public getAlbum(): Array<Figurina> {
    this.album = new Array<Figurina>(
      new Figurina('1', 'pippo', 0),
      new Figurina('2', 'pluto', 0),
      new Figurina('3', 'paperino', 0),
      new Figurina('4', 'paperone', 0),
    );

    return this.album;
  }

  public getMancolista(): Array<Figurina> {
    return this.mancolista;
  }

  public getCelo(): Array<Figurina> {
    return this.celo;
  }

  public getDoppie(): Array<Figurina> {
    return this.doppie;
  }

  public add(figurina: Figurina): void {
    figurina.count++;
    if (figurina.count > 1) {
      let doppione = this.doppie.find(x => x.id == figurina.id)
      if ((doppione != null) && (doppione.count > 0)) {
        doppione.count = figurina.count;
        let index = this.doppie.map(x => x.id).indexOf(doppione.id);
        this.doppie[index] = doppione;
      }
      else this.doppie.push(figurina);
    }
    else this.celo.push(figurina);
  }

  public remove(figurina: Figurina): void {
    if (figurina.count == 0) return;
    figurina.count--;
    if ((figurina.count > 1) && (this.doppie.find(x => x.id == figurina.id) == null)) this.doppie.push(figurina);
    else if (figurina.count == 1) {
      let index = this.doppie.indexOf(figurina, 0)
      this.doppie.splice(index, 1);
    } else if (figurina.count == 0) {
      let index = this.celo.indexOf(figurina, 0)
      this.celo.splice(index, 1);
    }
  }
}

