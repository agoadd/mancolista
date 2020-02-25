import { CollectionSticker } from './collectionSticker';
import { AlbumInfo } from './albumInfo';

export class Collection {

    public album: AlbumInfo;
    public ownedStickers: Array<CollectionSticker>;
    public missingStickers: Array<CollectionSticker>;
    public duplicateStickers: Array<CollectionSticker>;

    constructor() {
        this.album = new AlbumInfo()
    }
}
