import { Sticker } from './sticker';
export class CollectionSticker extends Sticker {
    quantity: number;

    constructor() {
        super();
        this.quantity = -1;
    }

    public IsDoppione() {
        return this.quantity > 0
    }

    public IsMancante() {
        return this.quantity == -1
    }

    public IsCelo() {
        return this.quantity == 0
    }
}


