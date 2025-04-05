import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth'; 

  private _userSubject: BehaviorSubject<User | null> 
    = new BehaviorSubject<User | null>(null);

  public user$: Observable<User | null> = this._userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}/login`, body);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  register(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}/register`, body);
  }

  setUser(user: User | null): void {
    this._userSubject.next(user);
  }

  getUser(): User | null {
    return this._userSubject.value;
  }
}