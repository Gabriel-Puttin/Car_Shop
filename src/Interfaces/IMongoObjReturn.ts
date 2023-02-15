export interface IMongoCarObjReturn {
  _id?: string;
  model: string;
  year: number;
  color: string;
  status?: boolean;
  buyValue: number;
  doorsQty: number;
  seatsQty: number;
  __v?: number;
}

export interface IMongoMotorcycleObjReturn {
  _id?: string;
  model: string;
  year: number;
  color: string;
  status?: boolean;
  buyValue: number;
  category: string;
  engineCapacity: number;
  __v?: number;
}