import { AlbumInfo } from './albumInfo';
import { Sticker } from './sticker';

export class Album extends AlbumInfo {
  public stickers: Array<Sticker>;

  public constructor() {
    super()
    this.stickers = new Array<Sticker>();
  }
}