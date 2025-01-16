import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'app-vehicle-details',
  imports: [NgIf],
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.css'
})
export class VehicleDetailsComponent implements OnInit {
  
  private _route = inject(ActivatedRoute);
  private _vehicleService = inject(VehicleService);

  public vehicle: Vehicle | null = null;

  ngOnInit(): void {
    this.getVehicle();
  }

  public getVehicle(): void {
    const vehicleId: string | null =
      this._route.snapshot.paramMap.get('vehicleId');

    if(vehicleId){
      this.vehicle = this._vehicleService.getVehicle(parseInt(vehicleId));
    }
  }
}
