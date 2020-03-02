import { AlbumInfo } from './../../Modules/albumInfo';
import { CollectionsService } from './../../Services/collections.service';
import { Component, OnInit } from '@angular/core';
import { AlbumsService } from './../../Services/albums.service';
import { Album } from './../../Modules/album';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  public albums: Array<Album>;

  constructor(private albumsService: AlbumsService, private collectionsService: CollectionsService, private _snackBar: MatSnackBar) { }

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
    this.openSnackBar();
  }

  private openSnackBar() {
    this._snackBar.open("Album Aggiunto", "Ok", {
      duration: 2000,
    });
  }

}