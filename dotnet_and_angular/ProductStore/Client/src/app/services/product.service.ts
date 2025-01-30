import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _http = inject(HttpClient);

  constructor() { }

  public getAllProducts(): Observable<any> {
    return this._http.get<any>(`/api/products`);
  }
}
