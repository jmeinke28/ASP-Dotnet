import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { EmailLoginDetails } from '../models/email-login-details';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http = inject(HttpClient);

  private _userKey: string = 'curUser';

  private _userSubject: BehaviorSubject<User | null> 
  = new BehaviorSubject<User | null>(null);

  public user$: Observable<User | null> = this._userSubject.asObservable();

  constructor() { 
    // Attempt to get user from localStorage
    const userJsonRaw = localStorage.getItem(this._userKey);

    // If no user is logged in currently, then localStorage will have given us back null
    const user: User | null = userJsonRaw ? JSON.parse(userJsonRaw) : null;

    /**
     * This is important to do in the constructor. If you do not,
     * then the BehaviorSubject is only filled on one of the following
     * method calls - which means if you do a hard refresh of the
     * app, the frontend will think that you are not logged in.
     */

    this._userSubject.next(user);
  }

  public get user(): User | null {
    return this._userSubject.value;
  }

  public register(details: EmailLoginDetails): Observable<User> {
    return this._http.post<User>(`/api/auth/register`, details);
  }

  public login(details: EmailLoginDetails): Observable<User>{
    return this._http.post<User>(`/api/auth/login`, details)
      .pipe(tap((user) => {
        // Update local storage with user
        localStorage.setItem(this._userKey, JSON.stringify(user));

        // Update the BehaviorSubject with the user.
        this._userSubject.next(user);
      }));
  }

  public logout(): Observable<any> {
    return this._http.post<any>(`/api/auth/logout`, {})
      .pipe(tap(() => {
        // Remove user from local storage
        localStorage.removeItem(this._userKey);

        // Remove the user from the BehaviorSubject
        this._userSubject.next(null);
      }));
  }
  
  public clearFrontendCredentials(): void {
    // Remove user from local storage
    localStorage.removeItem(this._userKey);

    // Remove the user from the BehaviorSubject
    this._userSubject.next(null);
  }

}
