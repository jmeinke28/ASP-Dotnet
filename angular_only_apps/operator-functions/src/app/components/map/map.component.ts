import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  private _dataService = inject(DataService);

  public data: number[] = this._dataService.data;

  public map: boolean = false;
  public data$: Observable<number[]> = this._dataService.data$.pipe(
    map((dataArr) => {
      // Note that this inner map() is the map() method on arrays in JavaScript,
      // not the RxJS map() function seen above.
      return dataArr.map((elem) => elem * 2);
    })
  );
}
