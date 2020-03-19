import { Firebaseable } from '../../shared/interfaces/firebaseable';

export class AlbumInfo implements Firebaseable {
    public id: string;
    public name: string;
    public year: string;
    public coverPath: string;

    constructor() {
        this.id = Math.random().toString(36).slice(3)+Math.random().toString(32).slice(3);
    }

    public toFirebase(id: string, name: string, year: string, coverPath: string) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.coverPath = coverPath;
        return { ...this };
    }
}
