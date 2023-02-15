import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';
import ErrorMap from '../utils/ErrorMap';

const carODM = new CarODM();
const ERROR_CAR_NOT_FOUND = 'Car not found';

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
    if (!car) throw new ErrorMap(404, ERROR_CAR_NOT_FOUND);
    return car;
  }

  public async updateCar(id: string, obj: ICar) {
    const car = await carODM.update(id, obj);
    if (!car) throw new ErrorMap(404, ERROR_CAR_NOT_FOUND);
    return car;
  }

  public async deleteCar(id: string) {
    const car = await carODM.delete(id);
    if (!car) throw new ErrorMap(404, ERROR_CAR_NOT_FOUND);
    return car;
  }
}