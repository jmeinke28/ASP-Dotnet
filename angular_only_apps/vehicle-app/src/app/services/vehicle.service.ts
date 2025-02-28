import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { VEHICLES } from '../mock-db/vehicles';

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
