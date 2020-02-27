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
    this.collectionsService.getCollections().subscribe((user) => {
      this.collections = user.collections.map((element) => {
        return {
          ...element
        } as Collection
      });
    });
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

  public add(sticker: CollectionSticker) {
    this.collectionsService.add(sticker);
  }

  public remove(sticker: CollectionSticker) {
    this.collectionsService.remove(sticker);
  }

  public reset(sticker: CollectionSticker) {
    this.collectionsService.reset(sticker);
  }

  public getCompletamento(collection: Collection) {
    return this.collectionsService.getProgress(collection);
  }
}
