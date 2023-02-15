import {
  Model,
  models,
  Schema,
  model,
  isValidObjectId,
  UpdateQuery,
} from 'mongoose';
import ErrorMap from '../utils/ErrorMap';

const ERROR_ID = 'Invalid mongo id';

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
    if (!isValidObjectId(_id)) throw new ErrorMap(422, ERROR_ID);
    return this.model.findById(_id);
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new ErrorMap(422, ERROR_ID);

    return this.model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new ErrorMap(422, ERROR_ID);

    return this.model.findByIdAndDelete({ _id });
  }
}