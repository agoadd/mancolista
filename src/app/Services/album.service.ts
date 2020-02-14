import { Injectable } from '@angular/core';
import { Figurina } from '../Modules/figurina';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor() { }

  getFigurine(): Figurina[] {
    var figurine: Figurina[] = [
      { id: '1', descrizione: 'pippo', count: 0 },
      { id: '2', descrizione: 'pippo', count: 0 },
      { id: '3', descrizione: 'pippo', count: 0 },
      { id: '4', descrizione: 'pippo', count: 0 },
      { id: '5', descrizione: 'pippo', count: 0 },
      { id: '6', descrizione: 'pippo', count: 0 },
      { id: '7', descrizione: 'pippo', count: 0 },];
    return figurine;
  }

}

