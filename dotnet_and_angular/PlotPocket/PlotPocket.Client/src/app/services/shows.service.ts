import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowsService {
  private apiUrl = '/api/shows';

  constructor(private http: HttpClient) {}

  addBookmark(showData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, showData);
  }

  removeBookmark(showId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${showId}`);
  }

  getAllBookmarks(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
