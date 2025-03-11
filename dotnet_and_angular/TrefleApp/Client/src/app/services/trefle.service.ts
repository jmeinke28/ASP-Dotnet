import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Plant } from '../models/plant';

@Injectable({
  providedIn: 'root',
})
export class TrefleService {
  private _http = inject(HttpClient);

  private _plantListSubject: BehaviorSubject<Plant[]> = new BehaviorSubject<
    Plant[]
  >([] as Plant[]);

  public plantList$: Observable<Plant[]> =
    this._plantListSubject.asObservable();

  constructor() {}

  public getPlants(): Observable<Plant[]> {
    return this._http.get<Plant[]>(`/api/trefle/plants`).pipe(
      tap((plants) => {
        this._plantListSubject.next(plants);
      })
    );
  }
}
