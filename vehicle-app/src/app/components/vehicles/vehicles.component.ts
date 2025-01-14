import { Component, Inject, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle';
import { VehicleCardComponent } from '../vehicle-card/vehicle-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [VehicleCardComponent, NgFor],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent implements OnInit {

  private _vehicleService = Inject(VehicleService);

  public vehicles: Vehicle[] = [] as Vehicle[];

  ngOnInit(): void {
    // Get all vehicles
    this.vehicles = this._vehicleService.getVehicles();
    console.log("Vehicles: " + this.vehicles);
  }

}
