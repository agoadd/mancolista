export class User {

    public stickers: Array<UserAlbum>;
    public username: string;
}

export interface UserAlbum {

    /** set a value for a specific key */
    set(key: string, value: number): void;

    /** get the value for a specific key. If not present return null*/
    get(key: string): number | null;

}
