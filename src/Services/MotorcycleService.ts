import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import Motorcycle from '../Domains/Motorcycle';

const motorcycleODM = new MotorcycleODM();

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
}