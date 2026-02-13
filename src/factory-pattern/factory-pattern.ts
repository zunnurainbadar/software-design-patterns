// Problem Statement:
// You are developing a Vehicle Rental System for a rental company.
// The system currently supports multiple vehicle types:
// Car
// Bike
// Truck

// Each vehicle type has its own behavior for starting, stopping, and calculating rental cost.

export enum VehicleType {
    Car = 'car',
    Bike = 'bike',
    Truck = 'truck'
}

export enum RentalRegionEnum {
    US = 'us',
    EU = 'eu',
    ASIA = 'asia'
}

export abstract class Vehicle {
    abstract start(): void;
    abstract stop(): void;
    abstract calculateRentalCost(days: number): number;
}

export abstract class RentalRegion {
    abstract createVehicle(type: VehicleType): Vehicle;
}

export class RentalRegionFactory {
    public static createRentalRegion(type: RentalRegionEnum): RentalRegion {
        switch (type) {
            case RentalRegionEnum.US:
                return new USRentalFactory();
            case RentalRegionEnum.EU:
                return new EURentalFactory();
            case RentalRegionEnum.ASIA:
                return new AsiaRentalFactory();
            default:
                throw new Error('Unknown rental region');
        }
    };
}

export class USRentalFactory extends RentalRegionFactory {
    createVehicle(type: VehicleType): Vehicle {
        switch (type) {
            case VehicleType.Car:
                return new Car();
            case VehicleType.Bike:
                return new Bike();
            case VehicleType.Truck:
                return new Truck();
            default:
                throw new Error('Unknown vehicle type');
        }
    }
}
export class EURentalFactory extends RentalRegionFactory {
    createVehicle(type: VehicleType): Vehicle {
        switch (type) {
            case VehicleType.Car:
                return new Car();
            case VehicleType.Bike:
                return new Bike();
            case VehicleType.Truck:
                return new Truck();
            default:
                throw new Error('Unknown vehicle type');
        }
    }
}
export class AsiaRentalFactory extends RentalRegionFactory {
    createVehicle(type: VehicleType): Vehicle {
        switch (type) {
            case VehicleType.Car:
                return new Car();
            case VehicleType.Bike:
                return new Bike();
            case VehicleType.Truck:
                return new Truck();
            default:
                throw new Error('Unknown vehicle type');
        }
    }
}



export class Car implements Vehicle {
    start(): void {
        console.log('Car started');
    }

    stop(): void {
        console.log('Car stopped');
    }

    calculateRentalCost(days: number): number {
        return days * 100; // Example cost calculation for Car
    }
}

export class Bike implements Vehicle {
    start(): void {
        console.log('Bike started');
    }

    stop(): void {
        console.log('Bike stopped');
    }

    calculateRentalCost(days: number): number {
        return days * 50; // Example cost calculation for Bike
    }
}

export class Truck implements Vehicle {
    start(): void {
        console.log('Truck started');
    }

    stop(): void {
        console.log('Truck stopped');
    }

    calculateRentalCost(days: number): number {
        return days * 150; // Example cost calculation for Truck
    }
}

const rentalRegion = RentalRegionFactory.createRentalRegion(RentalRegionEnum.US);
const vehicle = rentalRegion.createVehicle(VehicleType.Car);
vehicle.start();
vehicle.stop();