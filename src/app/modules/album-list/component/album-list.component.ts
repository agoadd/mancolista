import { Album } from '../../album/album';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/authentication/services/authentication.service';
import { CollectionsService } from '../../../core/services/collections.service';
import { AlbumsService } from '../../../core/services/albums.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
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
    this.snackBar.open("Album aggiunto alle tue raccolte", null, { duration: 500 });
  }
}