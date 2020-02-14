import { FIGURINE } from './../../figurine-mock';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit {
  figurine = FIGURINE;

  constructor() { }

  ngOnInit() {
  }
}
