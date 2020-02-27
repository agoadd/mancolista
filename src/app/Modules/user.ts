import { Collection } from './collection';

export class User {
    public id: string;
    public username: string;
    public collections: Array<Collection>;

    constructor() {
        this.username = '';
        this.collections = new Array<Collection>();
    }
}