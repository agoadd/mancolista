import { Sticker } from './sticker';

export class Album {
  public name: string;
  public stickers: Array<Sticker>;

  public constructor(name, stickers: Array<Sticker>) {
    this.name = name;
    this.stickers = stickers;
  }
}