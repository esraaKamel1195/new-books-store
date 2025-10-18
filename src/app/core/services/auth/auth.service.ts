import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@env/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly apiUrl = environment.backendUrl;

  constructor(private readonly http: HttpClient) {}

  // Check if localStorage is available
  private isLocalStorageAvailable(): boolean {
    try {
      return typeof localStorage !== 'undefined';
    } catch {
      return false;
    }
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, credentials);
  }

  verifyEmail(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/verify-email?token=${token}`);
  }

  forgetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/reset-password`, {email});
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/reset`, data);
  }

  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return JSON.parse(String(localStorage.getItem('token')));
    }
    return null;
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  getUserRole(): string {
    if (this.isLocalStorageAvailable()) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.role;
    } else {
      return 'not registered';
    }
  }

  logout() {
    return this.http.post<any>(`${this.apiUrl}/users/logout`, {});
  }
}
