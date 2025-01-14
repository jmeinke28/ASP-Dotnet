import { Component, Input } from '@angular/core';
import { Vehicle } from '../../models/vehicle';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.css'
})
export class VehicleCardComponent {

  @Input() vehicle: Vehicle | null = null;

}
