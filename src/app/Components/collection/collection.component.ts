import { Observable } from 'rxjs';

import { CollectionSticker } from './../../Modules/collectionSticker';
import { Component, OnInit } from '@angular/core';
import { Collection } from 'src/app/Modules/collection';
import { CollectionsService } from 'src/app/Services/collections.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  public collections: Array<Collection>;

  constructor(private collectionsService: CollectionsService) {
    this.collections = new Array<Collection>();
  }

  ngOnInit(): void {
    this.collectionsService.getCollections().subscribe(user => {
      this.collections = user.payload.data().collections.map(element => {
        return {
          ...element as Collection
        }
      });
    });
  }

  checkMancante(sticker: CollectionSticker): boolean {
    return sticker.quantity == -1
  }
  checkCelo(sticker: CollectionSticker): boolean {
    return sticker.quantity == 0
  }
  checkDoppione(sticker: CollectionSticker): boolean {
    return sticker.quantity > 0
  }

  incrementa(sticker: CollectionSticker, collectionId: String) {
    this.collectionsService.incrementa(sticker, collectionId)
  }
  decrementa(sticker: CollectionSticker, collectionId: String) {
    this.collectionsService.decrementa(sticker, collectionId)
  }
  resetta(sticker: CollectionSticker, collectionId: String) {
    this.collectionsService.resetta(sticker, collectionId)
  }

  getCompletamento(collection: Collection) {
    return this.collectionsService.getCompletamento(collection)
  }

}
