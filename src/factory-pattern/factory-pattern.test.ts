// Write tests for:
// 1) When type is passed in createVehicle, it should return an instance of the correct class (Car, Bike, Truck).
// 2) The start, stop, and calculateRentalCost methods should work correctly for each vehicle type.
// 3) An error should be thrown if an unknown vehicle type is passed to createVehicle.
// 4) Start and stop methods should log the correct messages to the console.
// 5) Create different region according to region type
// 6) Create a vehicle in a region
// 7) An error should be thrown if an unknown region type is passed to createRentalRegion.

import {
  VehicleType,
  Car,
  Bike,
  Truck,
  RentalRegionFactory,
  RentalRegionEnum,
  USRentalFactory,
  EURentalFactory,
  AsiaRentalFactory,
  RentalRegion
} from './factory-pattern';

describe('Factory Pattern', () => {
  describe('createVehicle (US region)', () => {
    let region: RentalRegion;
    beforeAll(() => {
      region = RentalRegionFactory.createRentalRegion(RentalRegionEnum.US);
    });
    it('should return a Car instance for VehicleType.Car', () => {
      const vehicle = region.createVehicle(VehicleType.Car);
      expect(vehicle).toBeInstanceOf(Car);
    });
    it('should return a Bike instance for VehicleType.Bike', () => {
      const vehicle = region.createVehicle(VehicleType.Bike);
      expect(vehicle).toBeInstanceOf(Bike);
    });
    it('should return a Truck instance for VehicleType.Truck', () => {
      const vehicle = region.createVehicle(VehicleType.Truck);
      expect(vehicle).toBeInstanceOf(Truck);
    });
    it('should throw an error for unknown vehicle type', () => {
      // @ts-expect-error
      expect(() => region.createVehicle('plane')).toThrow('Unknown vehicle type');
    });
  });

  describe('RentalRegionFactory', () => {
    it('should create USRentalFactory for US region', () => {
      const region = RentalRegionFactory.createRentalRegion(RentalRegionEnum.US);
      expect(region).toBeInstanceOf(USRentalFactory);
    });
    it('should create EURentalFactory for EU region', () => {
      const region = RentalRegionFactory.createRentalRegion(RentalRegionEnum.EU);
      expect(region).toBeInstanceOf(EURentalFactory);
    });
    it('should create AsiaRentalFactory for ASIA region', () => {
      const region = RentalRegionFactory.createRentalRegion(RentalRegionEnum.ASIA);
      expect(region).toBeInstanceOf(AsiaRentalFactory);
    });
    it('should throw an error for unknown region type', () => {
      // @ts-expect-error
      expect(() => RentalRegionFactory.createRentalRegion('africa')).toThrow('Unknown rental region');
    });
  });

  describe('Vehicle creation in region', () => {
    it('should create a Car in US region', () => {
      const region = RentalRegionFactory.createRentalRegion(RentalRegionEnum.US);
      const vehicle = region.createVehicle(VehicleType.Car);
      expect(region).toBeInstanceOf(USRentalFactory);
      expect(vehicle).toBeInstanceOf(Car);
    });
    it('should create a Bike in EU region', () => {
      const region = RentalRegionFactory.createRentalRegion(RentalRegionEnum.EU);
      const vehicle = region.createVehicle(VehicleType.Bike);
      expect(region).toBeInstanceOf(EURentalFactory);
      expect(vehicle).toBeInstanceOf(Bike);
    });
    it('should create a Truck in ASIA region', () => {
      const region = RentalRegionFactory.createRentalRegion(RentalRegionEnum.ASIA);
      const vehicle = region.createVehicle(VehicleType.Truck);
      expect(region).toBeInstanceOf(AsiaRentalFactory);
      expect(vehicle).toBeInstanceOf(Truck);
    });
    it('should throw an error for unknown vehicle type in region', () => {
      const region = RentalRegionFactory.createRentalRegion(RentalRegionEnum.US);
      // @ts-expect-error
      expect(() => region.createVehicle('plane')).toThrow('Unknown vehicle type');
    });
  });
  describe('Vehicle methods', () => {
    it('Car: start, stop, and calculateRentalCost', () => {
      const region = RentalRegionFactory.createRentalRegion(RentalRegionEnum.US);
      const car = region.createVehicle(VehicleType.Car);
      const logSpy = jest.spyOn(console, 'log').mockImplementation();
      car.start();
      expect(logSpy).toHaveBeenCalledWith('Car started');
      car.stop();
      expect(logSpy).toHaveBeenCalledWith('Car stopped');
      logSpy.mockRestore();
      expect(car.calculateRentalCost(2)).toBe(200);
    });
    it('Bike: start, stop, and calculateRentalCost', () => {
      const region = RentalRegionFactory.createRentalRegion(RentalRegionEnum.US);
      const bike = region.createVehicle(VehicleType.Bike);
      const logSpy = jest.spyOn(console, 'log').mockImplementation();
      bike.start();
      expect(logSpy).toHaveBeenCalledWith('Bike started');
      bike.stop();
      expect(logSpy).toHaveBeenCalledWith('Bike stopped');
      logSpy.mockRestore();
      expect(bike.calculateRentalCost(3)).toBe(150);
    });
    it('Truck: start, stop, and calculateRentalCost', () => {
      const region = RentalRegionFactory.createRentalRegion(RentalRegionEnum.US);
      const truck = region.createVehicle(VehicleType.Truck);
      const logSpy = jest.spyOn(console, 'log').mockImplementation();
      truck.start();
      expect(logSpy).toHaveBeenCalledWith('Truck started');
      truck.stop();
      expect(logSpy).toHaveBeenCalledWith('Truck stopped');
      logSpy.mockRestore();
      expect(truck.calculateRentalCost(1)).toBe(150);
    });
  });
});