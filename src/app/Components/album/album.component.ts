import { Figurina } from './../../Modules/figurina';
import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../Services/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit {

  public figurine: Figurina[];
  private service: AlbumService

  constructor(service: AlbumService) {
    this.service = service
  }

  ngOnInit() {
    this.figurine = this.service.getFigurine()
  }
}
