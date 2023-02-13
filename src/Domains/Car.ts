import ICar from '../Interfaces/ICar';

export default class Car {
  protected id?: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean | undefined;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor(carObject: ICar) {
    this.id = carObject.id;
    this.model = carObject.model;
    this.year = carObject.year;
    this.color = carObject.color;
    this.status = carObject.status;
    this.buyValue = carObject.buyValue;
    this.doorsQty = carObject.doorsQty;
    this.seatsQty = carObject.seatsQty;
  }

  public getDoorsQty(): number {
    return this.doorsQty;
  }

  public setDoorsQty(doorsQty: number) {
    this.doorsQty = doorsQty;
  }

  public getSeatsQty(): number {
    return this.seatsQty;
  }

  public setSeatsQty(seatsQty: number) {
    this.seatsQty = seatsQty;
  }
}