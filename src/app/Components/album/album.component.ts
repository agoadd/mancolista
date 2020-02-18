import { Component, OnInit } from '@angular/core';
import { AlbumService } from './../../Services/album.service';
import { Figurina } from './../../Modules/figurina';

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

  ngOnInit() { }

  constructor(service: AlbumService) {
    this.service = service;
    this.service.getAlbum().subscribe(data => {
      this.figurine = data.map(e => {
        return {
          ...e.payload.doc.data() as Figurina
        }
      });
      this.celo = this.service.getCelo(this.figurine);
      this.doppie = this.service.getDoppie(this.figurine);
    });
  }

  public add(figurina: Figurina): void {
    this.service.add(figurina);
  }

  public remove(figurina: Figurina): void {
    this.service.remove(figurina);
  }
}