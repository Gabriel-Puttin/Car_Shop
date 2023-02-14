import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Car from '../../../src/Domains/Car';
import { carInfo, carsArr } from '../../mocks/Cars.Mocks';
import CarService from '../../../src/Services/CarService';

describe('Tests of routes "/cars"', function () {
  it('should be possible create a new car', async function () {
    // Arrange
    const carOutput = new Car(carInfo);

    sinon.stub(Model, 'create').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.createNewCar(carInfo);

    // Assert
    expect(result).to.be.deep.equal(carOutput);
  });

  it('should be possible get all cars', async function () {
    // Arrange
    const carOutput = carsArr.map((car) => new Car(car));

    sinon.stub(Model, 'find').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.getAllCars();

    // Assert
    expect(result).to.be.deep.equal(carOutput);
  });

  it('should be possible get one car by ID', async function () {
    // Arrange
    const carOutput = new Car(carInfo);

    sinon.stub(Model, 'findById').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.getCarById('634852326b35b59438fbea2f');

    // Assert
    expect(result).to.be.deep.equal(carOutput);
  });

  it('should be unpossible get one car by invalid ID', async function () {
    // Arrange
    sinon.stub(Model, 'findById').throws(new Error('Invalid mongo id'));

    // Act
    try {
      const service = new CarService();
      await service.getCarById('Naruto');
    } catch (error) {
      // Assert
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  it('should be unpossible get one car if none car has been found', async function () {
    // Arrange
    sinon.stub(Model, 'findById').resolves();

    // Act
    try {
      const service = new CarService();
      await service.getCarById('634852326b35b59438fbea2f');
    } catch (error) {
      // Assert
      expect((error as Error).message).to.be.equal('Car not found');
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});