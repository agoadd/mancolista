import { Component, OnInit } from '@angular/core';
import { AlbumService } from './../../Services/album.service';
import { Album } from './../../Modules/album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  public albums: Array<Album>;

  constructor(private albumService: AlbumService) {  }

  ngOnInit(): void {
    this.albums = this.albumService.getAlbums();
  }
}