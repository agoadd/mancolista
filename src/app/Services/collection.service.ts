import { Injectable } from '@angular/core';
import { Collection } from './../Modules/collection';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private collection: Collection

  constructor() {
    this.collection = new Collection();
  }

  public getCollection(): Collection {
    return this.collection;
  }

  public add(): void { }

  public remove(): void { }

  // public getMissing(album: Array<Sticker>): Array<Sticker> {
  //   let missing = album.find(x => x.quantity == 0);
  //   if (missing) this.missing.push(missing);
  //   return this.missing;
  // }

  // public getOwned(album: Array<Sticker>): Array<Sticker> {
  //   let owned = album.find(x => x.quantity > 0);
  //   if (owned) this.owned.push(owned);
  //   return this.owned;
  // }

  // public getDuplicates(album: Array<Sticker>): Array<Sticker> {
  //   let duplicates = album.find(x => x.quantity > 1);
  //   if (duplicates) this.duplicates.push(duplicates);
  //   return this.duplicates;
  // }

  // public add(sticker: Sticker): void {
  //   sticker.quantity++;
  //   if ((sticker.quantity > 1) && (this.duplicates.find(x => x.code == sticker.code) == null)) this.duplicates.push(sticker);
  //   else if (sticker.quantity == 1) this.owned.push(sticker);
  // }

  // public remove(sticker: Sticker): void {
  //   if (sticker.quantity == 0) return;
  //   sticker.quantity--;
  //   if ((sticker.quantity > 1) && (this.duplicates.find(x => x.code == sticker.code) == null)) this.duplicates.push(sticker);
  //   else if (sticker.quantity == 1) {
  //     let index = this.duplicates.indexOf(sticker, 0)
  //     this.duplicates.splice(index, 1);
  //   } else if (sticker.quantity == 0) {
  //     let index = this.owned.indexOf(sticker, 0)
  //     this.owned.splice(index, 1);
  //   }
  // }
}
