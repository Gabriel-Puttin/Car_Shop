import { Request, Response, NextFunction } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';
import { IMongoMotorcycleObjReturn } from '../Interfaces/IMongoObjReturn';

const HTTP_CREATED_STATUS = 201;
const HTTP_OK_STATUS = 200;

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  private changeObj(obj: IMongoMotorcycleObjReturn) {
    return {
      id: obj._id,
      model: obj.model,
      year: obj.year,
      color: obj.color,
      status: obj.status,
      buyValue: obj.buyValue,
      category: obj.category,
      engineCapacity: obj.engineCapacity,
    };
  }

  public async create() {
    const newMotorcycle: IMotorcycle = { ...this.req.body, status: this.req.body.status || false };

    try {
      const createdMotorcycle = await this.service.createNewMotorcycle(newMotorcycle);
      return this.res.status(HTTP_CREATED_STATUS).json(createdMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const allMotorcycle = await this.service.getAllMotorcycle();
      return this.res.status(HTTP_OK_STATUS).json(allMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      const motorcycle = await this.service.getMotorcycleById(id);
      return this.res.status(HTTP_OK_STATUS).json(this.changeObj(motorcycle as IMotorcycle));
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const { id } = this.req.params;
    try {
      const motorcycle = await this.service.updateMotorcycle(id, this.req.body);
      return this.res.status(HTTP_OK_STATUS).json(this.changeObj(motorcycle as IMotorcycle));
    } catch (error) {
      this.next(error);
    }
  }
}