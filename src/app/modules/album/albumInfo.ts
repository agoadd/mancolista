import { Firebaseable } from './../../shared/interfaces/firebaseable';

export class AlbumInfo implements Firebaseable {
    public id: string;
    public name: string;
    public year: string;

    constructor() { }

    toFirebase(id: string, name: string, year: string) {
        this.id = id;
        this.name = name;
        this.year = year;

        return { ...this };
    }
}
