import { Sticker } from './sticker';
import { CollectionSticker } from './collectionSticker';
import { AlbumInfo } from './albumInfo';
import { Album } from './album';
import { Firebaseable } from './firebaseable';

export class Collection implements Firebaseable {
    public album: AlbumInfo;
    public stickers: Array<CollectionSticker>;

    constructor() {
        this.album = new AlbumInfo()
        this.stickers = new Array<CollectionSticker>();
    }

    public toFirebase(album: Album, stickers: Array<Sticker>) {
        this.album = this.album.toFirebase(album.id, album.name, album.year, album.coverPath);
        this.stickers = stickers.map((sticker) => {
            return {
                quantity: -1,
                ...sticker
            } as CollectionSticker
        });
        return { ...this }
    }
}
