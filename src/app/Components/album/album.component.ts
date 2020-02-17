import { Figurina } from './../../Modules/figurina';
import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../Services/album.service';

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

  constructor(service: AlbumService) {
    this.service = service;
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
