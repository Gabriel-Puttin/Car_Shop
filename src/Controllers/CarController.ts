import { Request, Response, NextFunction } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';
import { IMongoCarObjReturn } from '../Interfaces/IMongoObjReturn';

const HTTP_CREATED_STATUS = 201;
const HTTP_OK_STATUS = 200;

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  private changeObj(obj: IMongoCarObjReturn) {
    return {
      id: obj._id,
      model: obj.model,
      year: obj.year,
      color: obj.color,
      status: obj.status,
      buyValue: obj.buyValue,
      doorsQty: obj.doorsQty,
      seatsQty: obj.seatsQty,
    };
  }

  public async create() {
    const newCar: ICar = { ...this.req.body, status: this.req.body.status || false };

    try {
      const createdCar = await this.service.createNewCar(newCar);
      return this.res.status(HTTP_CREATED_STATUS).json(createdCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const allCars = await this.service.getAllCars();
      return this.res.status(HTTP_OK_STATUS).json(allCars);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      const car = await this.service.getCarById(id);
      return this.res.status(HTTP_OK_STATUS).json(this.changeObj(car));
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const { id } = this.req.params;
    try {
      const car = await this.service.updateCar(id, this.req.body);
      return this.res.status(HTTP_OK_STATUS).json(this.changeObj(car));
    } catch (error) {
      this.next(error);
    }
  }

  public async delete() {
    const { id } = this.req.params;
    try {
      const car = await this.service.deleteCar(id);
      return this.res.status(HTTP_OK_STATUS).json(this.changeObj(car));
    } catch (error) {
      this.next(error);
    }
  }
}