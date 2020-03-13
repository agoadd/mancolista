import { Album } from './../album';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../../core/authentication/services/authentication.service';
import { CollectionsService } from './../../../core/services/collections.service';
import { AlbumsService } from './../../../core/services/albums.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  public albums: Array<Album>;

  constructor(private albumsService: AlbumsService, private collectionsService: CollectionsService, public authService: AuthenticationService, public snackBar: MatSnackBar) { }

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
    this.snackBar.open("Album aggiunto alle tue raccolte", null, { duration: 5000 });
  }
}