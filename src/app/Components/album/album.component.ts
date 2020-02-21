import { Sticker } from './../../Modules/sticker';
import { Component, OnInit } from '@angular/core';
import { AlbumService } from './../../Services/album.service';
import { Album } from './../../Modules/album';
import { Utils } from './../../Modules/utils';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  public albums: Array<Album>;
  private stickers: Array<Sticker>;

  constructor(private albumService: AlbumService) {
    this.albums = new Array<Album>();
    this.stickers = new Array<Sticker>();
  }

  ngOnInit(): void {
    this.albumService.getStickers().subscribe(data => {
      this.stickers = data.map(e => {
        return {
          ...e.payload.doc.data() as Sticker
        }
      });

      Utils.groupBy(this.stickers, (sticker) => sticker.album).forEach(element => this.albums.push(new Album(element[0].album, element)));

    });
  }
}