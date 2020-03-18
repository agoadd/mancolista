import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sticker } from './../sticker';

@Component({
  selector: 'app-new-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.css']
})
export class StickerComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<StickerComponent>, @Inject(MAT_DIALOG_DATA) public data: Sticker) { }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
