import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';

export default class CarService {
  private createCarDomain(newCarObj: ICar | null): Car | null {
    if (newCarObj) {
      return new Car(newCarObj);
    }
    return null;
  }

  public async createNewCar(newCarObj: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(newCarObj);
    return this.createCarDomain(newCar);
  }
}