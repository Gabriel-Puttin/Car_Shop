import {
  Model,
  models,
  Schema,
  model,
  isValidObjectId,
} from 'mongoose';
import ErrorMap from '../utils/ErrorMap';

export default abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    const results = await this.model.create({ ...obj });
    return { id: results._id, ...obj };
  }

  public async getAll(): Promise<T[]> {
    return this.model.find();
  }

  public async getById(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new ErrorMap(422, 'Invalid mongo id');
    return this.model.findById(_id);
  }
}