import IVehicles from './IVehicle';

type Category = 'Street' | 'Custom' | 'Trail';

interface IMotorcycle extends IVehicles {
  category: Category;
  engineCapacity: number;
}

export default IMotorcycle;