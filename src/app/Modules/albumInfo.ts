export class AlbumInfo {
    public id: string;
    public name: string;
    public year: string;

    constructor() { }
    
    public setAlbumInfo(id: string, name: string, year: string) {
        this.id = id;
        this.name = name;
        this.year = year;
    }
}
