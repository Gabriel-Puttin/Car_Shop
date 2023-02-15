import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Car from '../../../src/Domains/Car';
import { carInfo, carsArr } from '../../mocks/Cars.Mocks';
import CarService from '../../../src/Services/CarService';

const ERROR_ID = 'Invalid mongo id';
const ID = '634852326b35b59438fbea2f';

describe('Tests of routes "/cars"', function () {
  it('should be possible to create a new car', async function () {
    // Arrange
    const carOutput = new Car(carInfo);

    sinon.stub(Model, 'create').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.createNewCar(carInfo);

    // Assert
    expect(result).to.be.deep.equal(carOutput);
  });

  it('should be possible to get all cars', async function () {
    // Arrange
    const carOutput = carsArr.map((car) => new Car(car));

    sinon.stub(Model, 'find').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.getAllCars();

    // Assert
    expect(result).to.be.deep.equal(carOutput);
  });

  it('should be possible to get one car by ID', async function () {
    // Arrange
    const carOutput = new Car(carInfo);

    sinon.stub(Model, 'findById').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.getCarById(ID);

    // Assert
    expect(result).to.be.deep.equal(carOutput);
  });

  it('should be impossible to get one car by invalid ID', async function () {
    // Arrange
    sinon.stub(Model, 'findById').throws(new Error(ERROR_ID));

    // Act
    try {
      const service = new CarService();
      await service.getCarById('Naruto');
    } catch (error) {
      // Assert
      expect((error as Error).message).to.be.equal(ERROR_ID);
    }
  });

  it('should be impossible to get one car if none has been found', async function () {
    // Arrange
    sinon.stub(Model, 'findById').resolves();

    // Act
    try {
      const service = new CarService();
      await service.getCarById(ID);
    } catch (error) {
      // Assert
      expect((error as Error).message).to.be.equal('Car not found');
    }
  });

  it('should be possible to update one car by ID', async function () {
    // Arrange
    const carOutput = new Car(carInfo);

    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.updateCar(ID, carInfo);

    // Assert
    expect(result).to.be.deep.equal(carOutput);
  });

  it('should be impossible to update one car if none has been found', async function () {
    // Arrange
    sinon.stub(Model, 'findByIdAndUpdate').resolves();

    // Act
    try {
      const service = new CarService();
      await service.updateCar(ID, carInfo);
    } catch (error) {
      // Assert
      expect((error as Error).message).to.be.deep.equal('Car not found');
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});