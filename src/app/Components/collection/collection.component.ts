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

  public ngOnInit(): void {
    this.collectionsService.getCollections()
      .subscribe((collections) => {
        this.collections = collections.map(collection => { return { ...collection } as Collection });
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
    return this.collectionsService.removeCollectionToUSer(collection);
  }
}
