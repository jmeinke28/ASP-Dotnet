import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TvshowsService {
  private baseUrl = '/api/tvshows'; // Ensure this matches the backend route for TV shows

  constructor(private http: HttpClient) {}

  getAiringToday(): Observable<any> {
    return this.http.get(`${this.baseUrl}/airing-today`); // Match backend endpoint
  }

  getTopRated(): Observable<any> {
    return this.http.get(`${this.baseUrl}/top-rated`); // Match backend endpoint
  }

  getPopular(): Observable<any> {
    return this.http.get(`${this.baseUrl}/popular`); // Match backend endpoint
  }
}
