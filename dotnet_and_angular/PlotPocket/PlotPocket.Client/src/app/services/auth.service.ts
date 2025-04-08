// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { tap } from 'rxjs/operators';
// import { User } from '../models/UserDto';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = '/api/auth';
//   private _userKey = 'loggedInUser';

//   private _userSubject: BehaviorSubject<User | null>;
//   public user$: Observable<User | null>;

//   constructor(private http: HttpClient) {
//     const userJsonRaw = localStorage.getItem(this._userKey);
//     const user: User | null = userJsonRaw ? JSON.parse(userJsonRaw) : null;

//     this._userSubject = new BehaviorSubject<User | null>(user);
//     this.user$ = this._userSubject.asObservable();
//   }

//   login(email: string, password: string): Observable<User> {
//     const body = { email, password };
//     return this.http.post<User>(`${this.apiUrl}/login`, body).pipe(
//       tap((user: User) => {
//         localStorage.setItem(this._userKey, JSON.stringify(user));
//         this._userSubject.next(user);
//       })
//     );
//   }

//   logout(): Observable<any> {
//     localStorage.removeItem(this._userKey);
//     this._userSubject.next(null);
//     return this.http.post(`${this.apiUrl}/logout`, {});
//   }

//   register(email: string, password: string): Observable<any> {
//     const body = { email, password };
//     return this.http.post<any>(`${this.apiUrl}/register`, body);
//   }

//   setUser(user: User | null): void {
//     if (user) {
//       localStorage.setItem(this._userKey, JSON.stringify(user));
//     } else {
//       localStorage.removeItem(this._userKey);
//     }
//     this._userSubject.next(user);
//   }

//   getUser(): User | null {
//     return this._userSubject.value;
//   }
// }
