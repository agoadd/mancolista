import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../material.module';
import { NewAlbumComponent } from './component/new-album.component';
import { StickerComponent } from './../sticker/component/sticker.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [NewAlbumComponent, StickerComponent]
})
export class NewAlbumModule { }
