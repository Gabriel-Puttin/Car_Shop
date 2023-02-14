import ICar from '../Interfaces/ICar';
import Vehicles from './Vehicles';

export default class Car extends Vehicles {
  private doorsQty: number;
  private seatsQty: number;

  constructor({
    id,
    model,
    year,
    color,
    status,
    buyValue,
    doorsQty,
    seatsQty,
  }: ICar) {
    super({ id, model, year, color, status, buyValue });
    this.doorsQty = doorsQty;
    this.seatsQty = seatsQty;
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