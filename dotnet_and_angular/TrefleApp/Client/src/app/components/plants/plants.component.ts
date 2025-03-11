import { Component, inject, OnInit } from '@angular/core';
import { TrefleService } from '../../services/trefle.service';
import { Observable } from 'rxjs';
import { Plant } from '../../models/plant';
import { CommonModule } from '@angular/common';
import { PlantCardComponent } from '../plant-card/plant-card.component';

@Component({
  selector: 'app-plants',
  standalone: true,
  imports: [CommonModule, PlantCardComponent],
  templateUrl: './plants.component.html',
  styleUrl: './plants.component.css',
})
export class PlantsComponent implements OnInit {
  private _trefleService = inject(TrefleService);

  public plantList$: Observable<Plant[]> = this._trefleService.plantList$;

  ngOnInit(): void {
    this._trefleService.getPlants().subscribe((plants) => {
      console.log(plants);
    });
  }
}
