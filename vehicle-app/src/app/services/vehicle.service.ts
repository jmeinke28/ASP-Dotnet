import { Injectable } from '@angular/core';
import { VEHICLES } from '../mock-db/vehicles';
import { Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor() { }

  public getVehicles(): Vehicle[] {
    return VEHICLES;
  }

  public getVehicle(vehicleId: number): Vehicle | null {
    const vehicle: Vehicle | undefined = VEHICLES.find(
      (vehicle) => vehicle.id === vehicleId
    );
    return vehicle ? vehicle : null;
  }
}
