import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrendingService {
  private apiUrl = '/api/trending';

  constructor(private http: HttpClient) {}

  // Get trending all
  getTrendingAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  // Method to get trending movies
  getTrendingMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies`);
  }

  // Method to get trending TV shows
  getTrendingTVShows(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tv`);
  }
}
