import { Request, Response, NextFunction } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

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

  public async create() {
    const newCar: ICar = { ...this.req.body, status: this.req.body.status || false };

    try {
      const createdCar = await this.service.createNewCar(newCar);
      return this.res.status(201).json(createdCar);
    } catch (error) {
      this.next(error);
    }
  }
}