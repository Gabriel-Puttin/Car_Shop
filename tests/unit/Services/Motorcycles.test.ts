import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Motorcycle from '../../../src/Domains/Motorcycle';
import { motorcycleInfo, motorcycleArr } from '../../mocks/Motorcycle.Mocks';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const ERROR_ID = 'Invalid mongo id';
const ID = '6348513f34c397abcad040b2';

describe('Tests of routes "/motorcycles"', function () {
  it('should be possible to create a new Motorcycle', async function () {
    // Arrange
    const motorcycleOutput = new Motorcycle(motorcycleInfo);

    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.createNewMotorcycle(motorcycleInfo);

    // Assert
    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('should be possible to get all motorcycles', async function () {
    // Arrange
    const motorcycleOutput = motorcycleArr.map((motorcycle) => new Motorcycle(motorcycle));

    sinon.stub(Model, 'find').resolves(motorcycleOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.getAllMotorcycle();

    // Assert
    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('should be possible to get one motorcycle by ID', async function () {
    // Arrange
    const motorcycleOutput = new Motorcycle(motorcycleInfo);

    sinon.stub(Model, 'findById').resolves(motorcycleOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.getMotorcycleById(ID);

    // Assert
    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('should be impossible to get one motorcycle by invalid ID', async function () {
    // Arrange
    sinon.stub(Model, 'findById').throws(new Error(ERROR_ID));

    // Act
    try {
      const service = new MotorcycleService();
      await service.getMotorcycleById('Naruto');
    } catch (error) {
      // Assert
      expect((error as Error).message).to.be.equal(ERROR_ID);
    }
  });

  it('should be impossible to get one motorcycle if none has been found', async function () {
    // Arrange
    sinon.stub(Model, 'findById').resolves();

    // Act
    try {
      const service = new MotorcycleService();
      await service.getMotorcycleById(ID);
    } catch (error) {
      // Assert
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
  });

  it('should be possible to update one motorcycle by ID', async function () {
    // Arrange
    const motorcycleOutput = new Motorcycle(motorcycleInfo);

    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.updateMotorcycle(ID, motorcycleInfo);

    // Assert
    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('should be impossible to update one motorcycle if none has been found', async function () {
    // Arrange
    sinon.stub(Model, 'findByIdAndUpdate').resolves();

    // Act
    try {
      const service = new MotorcycleService();
      await service.updateMotorcycle(ID, motorcycleInfo);
    } catch (error) {
      // Assert
      expect((error as Error).message).to.be.deep.equal('Motorcycle not found');
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});