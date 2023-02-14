import IVehicles from '../Interfaces/IVehicles';

export default class Vehicles {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;

  constructor({ id, model, year, color, status = false, buyValue }: IVehicles) {
    this.id = id;
    this.model = model;
    this.year = year;
    this.color = color;
    this.status = status;
    this.buyValue = buyValue;
  }
}