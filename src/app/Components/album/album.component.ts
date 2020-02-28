import { MatSnackBar } from '@angular/material/snack-bar';
import { CollectionsService } from './../../Services/collections.service';
import { Component, OnInit } from '@angular/core';
import { AlbumsService } from './../../Services/albums.service';
import { Album } from './../../Modules/album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  public albums: Array<Album>;

  constructor(private albumsService: AlbumsService, private collectionsService: CollectionsService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.albumsService.getAlbums().subscribe((album) => {
      this.albums = album.map((element) => {
        return {
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        } as Album
      });

    });
  }

  public addCollectionToUser(album: Album) {
    this.collectionsService.addCollectionToUser(album);
    this.snackBar.open("Album aggiunto alle tue raccolte", null, { duration:5000 });
  }
}