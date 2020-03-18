import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from './../../../core/authentication/services/authentication.service';
import { Album } from './../../album/album';
import { Sticker } from './../../sticker/sticker';
import { StickerComponent } from '../../sticker/component/sticker.component';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.css']
})
export class NewAlbumComponent implements OnInit {
  public album: Album;

  constructor(public dialog: MatDialog, public authService: AuthenticationService) { }

  /* TO-DO: aggiungere album sul db*/

  openDialog(): void {
    const addStickerDialog = this.dialog.open(StickerComponent, {
      width: '300px',
      data: {}
    });

    addStickerDialog.afterClosed().subscribe(result => {
      this.album.stickers.push(result as Sticker);
    });
  }

  ngOnInit() {
    this.album = new Album();
  }
}
