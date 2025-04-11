import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl = '/api/movies';

  constructor(private http: HttpClient) {}

  getNowPlayingMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/now-playing`);
  }

  getTopRatedMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/top-rated`);
  }

  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/popular`);
  }
}
