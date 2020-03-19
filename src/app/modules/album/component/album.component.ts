import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../../core/authentication/services/authentication.service';
import { AlbumsService } from '../../../core/services/albums.service';
import { Album } from './../album';
import { Sticker } from '../../sticker/sticker';
import { StickerComponent } from '../../sticker/component/sticker.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  public album: Album;

  constructor(public authService: AuthenticationService, private albumService: AlbumsService, private dialog: MatDialog, public snackBar: MatSnackBar) { }

  public setAlbum(): void {
    this.albumService.setAlbum(this.album);
    this.snackBar.open("Nuovo album aggiunto!", null, { duration: 500 });
    this.album = new Album();
  }

  public openDialog(): void {
    const addStickerDialog = this.dialog.open(StickerComponent, { data: {} });

    addStickerDialog.afterClosed().subscribe(result => {
      if (result == undefined || Object.keys(result).length == 0) return;
      this.album.stickers.push(result as Sticker);
      this.snackBar.open("Figurina aggiunta al nuovo album!", null, { duration: 500 });
    });
  }

  ngOnInit() {
    this.album = new Album();
  }
}
