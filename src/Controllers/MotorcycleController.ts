import { Request, Response, NextFunction } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

const HTTP_CREATED_STATUS = 201;

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

  public async create() {
    const newMotorcycle: IMotorcycle = { ...this.req.body, status: this.req.body.status || false };

    try {
      const createdMotorcycle = await this.service.createNewMotorcycle(newMotorcycle);
      return this.res.status(HTTP_CREATED_STATUS).json(createdMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }
}