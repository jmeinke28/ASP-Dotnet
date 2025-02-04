import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _http = inject(HttpClient);

  private _productListSubject: BehaviorSubject<Product[]> =
    new BehaviorSubject<Product[]>([] as Product[]);

  public productList$: Observable<Product[]> = 
    this._productListSubject.asObservable();

  constructor() { }

  public getAllProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(`/api/products`).pipe(
      tap((productList) => {
        // Place product list inside of BehaviorSubject
        this._productListSubject.next(productList);
      })
    );
  }
}