import { Component, inject, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle';
import { VehicleCardComponent } from '../vehicle-card/vehicle-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-vehicles',
  imports: [VehicleCardComponent, NgFor],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent implements OnInit {
  private _vehicleService = inject(VehicleService);

  public vehicles: Vehicle[] = [] as Vehicle[];
  
  ngOnInit(): void {
    // Get all of the vehicles that we have
    this.vehicles = this._vehicleService.getVehicles();
    
  }

}
