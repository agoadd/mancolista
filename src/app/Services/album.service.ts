import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor() { }

  getFigurine(): String[] {
    var figurine = ['1', '2', '3', '4', '5'];
    return figurine
  }

}

