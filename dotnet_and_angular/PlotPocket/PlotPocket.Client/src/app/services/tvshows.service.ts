import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TvshowsService {
  private baseUrl = '/api/tvshows'; 

  constructor(private http: HttpClient) {}

  getAiringToday(): Observable<any> {
    return this.http.get(`${this.baseUrl}/airing-today`); 
  }

  getTopRated(): Observable<any> {
    return this.http.get(`${this.baseUrl}/top-rated`); 
  }

  getPopular(): Observable<any> {
    return this.http.get(`${this.baseUrl}/popular`); 
  }
}
