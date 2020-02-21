import { CollectionSticker } from './collectionSticker';
import { AlbumInfo } from './albumInfo';

export class Collection {
    public album: AlbumInfo;
    public ownedStickers: Array<CollectionSticker>;

    constructor() {
        this.ownedStickers = new Array<CollectionSticker>();
    }

    // public getDuplicates(): Array<CollectionSticker> {
    //     return this.ownedStickers.filter(x => x.quantity > 1);
    // }

    // public getMissings(): Array<CollectionSticker> {
    //     return this.ownedStickers.filter(x => x.quantity == 0);
    // }
}
