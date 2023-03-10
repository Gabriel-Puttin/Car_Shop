import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import Motorcycle from '../Domains/Motorcycle';
import ErrorMap from '../utils/ErrorMap';

const motorcycleODM = new MotorcycleODM();
const ERROR_MOTORCYCLE_NOT_FOUND = 'Motorcycle not found';

export default class MotorcycleService {
  private createMotorcycleDomain(newMotorcycleObj: IMotorcycle | null): Motorcycle | null {
    if (newMotorcycleObj) {
      return new Motorcycle(newMotorcycleObj);
    }
    return null;
  }

  public async createNewMotorcycle(newMotorcycleObj: IMotorcycle): Promise<Motorcycle | null> {
    const newMotorcycle = await motorcycleODM.create(newMotorcycleObj);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAllMotorcycle(): Promise<(Motorcycle | null)[]> {
    const motorcycles = await motorcycleODM.getAll();
    const motorcyclesArray = motorcycles.map((m) =>
      this.createMotorcycleDomain(m));
    return motorcyclesArray;
  }

  public async getMotorcycleById(id: string): Promise<IMotorcycle | null> {
    const motorcycle = await motorcycleODM.getById(id);
    if (!motorcycle) throw new ErrorMap(404, ERROR_MOTORCYCLE_NOT_FOUND);
    return motorcycle;
  }

  public async updateMotorcycle(id: string, obj: IMotorcycle): Promise<IMotorcycle | null> {
    const motorcycle = await motorcycleODM.update(id, obj);
    if (!motorcycle) throw new ErrorMap(404, ERROR_MOTORCYCLE_NOT_FOUND);
    return motorcycle;
  }

  public async deleteMotorcycle(id: string): Promise<IMotorcycle | null> {
    const motorcycle = await motorcycleODM.delete(id);
    if (!motorcycle) throw new ErrorMap(404, ERROR_MOTORCYCLE_NOT_FOUND);
    return motorcycle;
  }
}