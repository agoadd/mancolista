import { Sticker } from './sticker';
import { CollectionSticker } from './collectionSticker';
import { AlbumInfo } from './albumInfo';
import { Album } from './album';

export class Collection {
    public album: AlbumInfo;
    public stickers: Array<CollectionSticker>;

    constructor() {
        this.album = new AlbumInfo()
        this.stickers = new Array<CollectionSticker>();
    }

    public setCollection(album: Album, stickers: Array<Sticker>): void {
        this.album = new AlbumInfo();
        this.album.setAlbumInfo("album.id", album.name, album.year);
        this.stickers = stickers.map((sticker) => {
              return sticker as CollectionSticker;            
        });
    }
}
