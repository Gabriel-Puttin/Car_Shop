import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';
import ErrorMap from '../utils/ErrorMap';

const carODM = new CarODM();

export default class CarService {
  private createCarDomain(newCarObj: ICar | null): Car | null {
    if (newCarObj) {
      return new Car(newCarObj);
    }
    return null;
  }

  public async createNewCar(newCarObj: ICar) {
    const newCar = await carODM.create(newCarObj);
    return this.createCarDomain(newCar);
  }

  public async getAllCars() {
    const cars = await carODM.getAll();
    const carsArray = cars.map((car) =>
      this.createCarDomain(car));
    return carsArray;
  }

  public async getCarById(id: string) {
    const car = await carODM.getById(id);
    if (!car) throw new ErrorMap(404, 'Car not found');
    return car;
  }
}