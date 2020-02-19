import { Sticker } from './sticker';

export class Collection {
    public owned: Array<Sticker>;
    public missing: Array<Sticker>;
    public duplicates: Array<Sticker>;

    constructor() {
        this.owned = new Array<Sticker>();
        this.missing = new Array<Sticker>();
        this.duplicates = new Array<Sticker>();
    }
}
