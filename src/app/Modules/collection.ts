import { CollectionSticker } from './collectionSticker';
import { AlbumInfo } from './albumInfo';

export class Collection {

    public album: AlbumInfo;
    public stickers: Array<CollectionSticker>;

    constructor() {
        this.album = new AlbumInfo()
        this.stickers = new Array<CollectionSticker>();
    }

}
