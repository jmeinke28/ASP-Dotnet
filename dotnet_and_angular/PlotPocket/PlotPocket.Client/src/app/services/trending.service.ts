import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrendingService {
  private apiUrl = '/api/trending';

  constructor(private http: HttpClient) {}

  getTrendingAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  getTrendingMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies`);
  }

  getTrendingTVShows(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tv`);
  }
}
