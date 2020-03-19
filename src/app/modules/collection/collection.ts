import { Firebaseable } from './../../shared/interfaces/firebaseable';
import { Sticker } from './../sticker/sticker';
import { CollectionSticker } from './../sticker/collectionSticker';
import { AlbumInfo } from './../album/albumInfo';
import { Album } from '../album/album';


export class Collection implements Firebaseable {
    public id: string
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
