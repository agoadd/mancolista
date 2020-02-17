export class Figurina {
  public id: string;
  public descrizione: string;
  public count: number;

  constructor(id: string, descrizione: string, count: number) {
    this.id = id;
    this.descrizione = descrizione;
    this.count = count;
  }
}
