import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Plant } from '../../models/plant';

@Component({
  selector: 'app-plant-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plant-card.component.html',
  styleUrl: './plant-card.component.css',
})
export class PlantCardComponent {
  @Input() plant: Plant | null = null;
}
