import { Component, OnInit } from '@angular/core';
import { Collection } from '../collection';
import { CollectionSticker } from '../../sticker/collectionSticker';
import { CollectionsService } from './../../../core/services/collections.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  public collections: Array<Collection>;

  constructor(private collectionsService: CollectionsService) {
  }

  public ngOnInit(): void {
    this.collectionsService.getCollections()
      .subscribe((collections) => {
        this.collections = collections.map(collection => {
          return { id: collection.payload.doc.id, ...collection.payload.doc.data() } as Collection
        });

      });
  }

  public increment(sticker: CollectionSticker, collection: Collection) {
    this.collectionsService.increment(sticker, collection);
  }

  public decrement(sticker: CollectionSticker, collection: Collection) {
    this.collectionsService.decrement(sticker, collection);
  }

  public reset(sticker: CollectionSticker, collection: Collection) {
    this.collectionsService.reset(sticker, collection);
  }

  public getCompletamento(collection: Collection) {
    return this.collectionsService.getProgress(collection);
  }

  public removeCollection(collection: Collection) {
    return this.collectionsService.removeCollectionFromUser(collection);
  }

  public checkMancante(sticker: CollectionSticker): boolean {
    return sticker.quantity == -1;
  }

  public checkCelo(sticker: CollectionSticker): boolean {
    return sticker.quantity == 0;
  }

  public checkDoppione(sticker: CollectionSticker): boolean {
    return sticker.quantity > 0;
  }
}
