// Write tests for:
// 1) When type is passed in createVehicle, it should return an instance of the correct class (Car, Bike, Truck).
// 2) The start, stop, and calculateRentalCost methods should work correctly for each vehicle type.
// 3) An error should be thrown if an unknown vehicle type is passed to createVehicle.
// 4) Start and stop methods should log the correct messages to the console.
// 5) Create different region according to region type
// 6) Create a vehicle in a region
// 7) An error should be thrown if an unknown region type is passed to createRentalRegion.
// 8) Add tests for handling rental values less than 0
// 9) Add tests for handling non-integer rental days
// 10) Add tests for handling extremely large rental days
// 11) Add tests for handling non-numeric rental days
// 12) Add tests for handling zero rental days
// 13) Add tests for handling negative rental days
// 14) Add tests for handling fractional rental days

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
    const region = RentalRegionFactory.createRentalRegion(RentalRegionEnum.US);
    const vehicles = [
      { type: VehicleType.Car, class: Car, startMsg: 'Car started', stopMsg: 'Car stopped', rate: 100 },
      { type: VehicleType.Bike, class: Bike, startMsg: 'Bike started', stopMsg: 'Bike stopped', rate: 50 },
      { type: VehicleType.Truck, class: Truck, startMsg: 'Truck started', stopMsg: 'Truck stopped', rate: 150 }
    ];
    vehicles.forEach(({ type, class: VehicleClass, startMsg, stopMsg, rate }) => {
      it(`${VehicleClass.name}: start, stop, and calculateRentalCost`, () => {
        const vehicle = region.createVehicle(type);
        const logSpy = jest.spyOn(console, 'log').mockImplementation();
        vehicle.start();
        expect(logSpy).toHaveBeenCalledWith(startMsg);
        vehicle.stop();
        expect(logSpy).toHaveBeenCalledWith(stopMsg);
        logSpy.mockRestore();
        expect(vehicle.calculateRentalCost(2)).toBe(2 * rate);
      });
    });

    // Edge case tests
    vehicles.forEach(({ type, rate }) => {
      it(`${type}: rental days less than 0`, () => {
        const vehicle = region.createVehicle(type);
        expect(vehicle.calculateRentalCost(-5)).toBe(-5 * rate);
      });
      it(`${type}: rental days as non-integer`, () => {
        const vehicle = region.createVehicle(type);
        expect(vehicle.calculateRentalCost(2.5)).toBe(2.5 * rate);
      });
      it(`${type}: extremely large rental days`, () => {
        const vehicle = region.createVehicle(type);
        expect(vehicle.calculateRentalCost(1e6)).toBe(1e6 * rate);
      });
      it(`${type}: rental days as string (non-numeric)`, () => {
        const vehicle = region.createVehicle(type);
        // @ts-expect-error
        expect(vehicle.calculateRentalCost('abc')).toBeNaN();
      });
      it(`${type}: rental days as zero`, () => {
        const vehicle = region.createVehicle(type);
        expect(vehicle.calculateRentalCost(0)).toBe(0);
      });
      it(`${type}: rental days as negative`, () => {
        const vehicle = region.createVehicle(type);
        expect(vehicle.calculateRentalCost(-1)).toBe(0);
      });
      it(`${type}: rental days as fractional`, () => {
        const vehicle = region.createVehicle(type);
        expect(vehicle.calculateRentalCost(1.75)).toBe(1.75 * rate);
      });
    });
    // Test for rental days as non-numeric (null, undefined)
    vehicles.forEach(({ type }) => {
      it(`${type}: rental days as null`, () => {
        const vehicle = region.createVehicle(type);
        // @ts-expect-error
        expect(vehicle.calculateRentalCost(null)).toBe(0);
      });
      it(`${type}: rental days as undefined`, () => {
        const vehicle = region.createVehicle(type);
        // @ts-expect-error
        expect(vehicle.calculateRentalCost(undefined)).toBeNaN();
      });
    });
    // Test for rental days as array/object
    vehicles.forEach(({ type }) => {
      it(`${type}: rental days as array`, () => {
        const vehicle = region.createVehicle(type);
        // @ts-expect-error
        expect(vehicle.calculateRentalCost([1,2])).toBeNaN();
      });
      it(`${type}: rental days as object`, () => {
        const vehicle = region.createVehicle(type);
        // @ts-expect-error
        expect(vehicle.calculateRentalCost({days:2})).toBeNaN();
      });
    });
  });
});