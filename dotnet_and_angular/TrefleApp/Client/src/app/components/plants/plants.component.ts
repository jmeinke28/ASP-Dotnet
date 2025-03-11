import { Component, inject, OnInit } from '@angular/core';
import { TrefleService } from '../../services/trefle.service';
import { Observable } from 'rxjs';
import { Plant } from '../../models/plant';
import { CommonModule } from '@angular/common';
import { PlantCardComponent } from '../plant-card/plant-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NameSearchPipe } from '../../pipes/name-search.pipe';
import { PlantFilterService } from '../../services/plant-filter.service';

@Component({
  selector: 'app-plants',
  standalone: true,
  imports: [
    CommonModule,
    PlantCardComponent,
    SearchBarComponent,
    NameSearchPipe
  ],
  templateUrl: './plants.component.html',
  styleUrl: './plants.component.css',
})
export class PlantsComponent implements OnInit {
  private _trefleService = inject(TrefleService);
  private _plantFilterService = inject(PlantFilterService);

  public plantList$: Observable<Plant[]> = this._trefleService.plantList$;

  public searchQuery$: Observable<string> =
    this._plantFilterService.searchQuery$;


  ngOnInit(): void {
    this._trefleService.getPlants().subscribe();
  }
}
