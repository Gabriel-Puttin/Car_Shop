import IVehicles from './IVehicles';

interface ICar extends IVehicles {
  doorsQty: number;
  seatsQty: number;
}

export default ICar;