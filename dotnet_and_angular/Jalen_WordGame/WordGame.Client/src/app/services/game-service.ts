import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameDto } from '../models/GameDto';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:5000/api/wordgame'; 

  constructor(private http: HttpClient) {}

  private getOptions() {
    return {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getAllGames(): Observable<GameDto[]> {
    return this.http.get<GameDto[]>(`${this.apiUrl}`, this.getOptions()); 
  }

  createGame(): Observable<GameDto> {
    return this.http.post<GameDto>(`${this.apiUrl}`, {}, this.getOptions()); 
  }

  makeGuess(gameId: number, guess: string): Observable<GameDto> {
    return this.http.post<GameDto>(`${this.apiUrl}/${gameId}/guesses?guess=${guess}`, {}, this.getOptions()); 
  }

  deleteGame(gameId: number): Observable<GameDto[]> {
    return this.http.delete<GameDto[]>(`${this.apiUrl}/${gameId}`, this.getOptions()); 
  }
}