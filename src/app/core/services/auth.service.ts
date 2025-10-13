import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { clearUser, setUser } from '@features/state/auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  apiUrl = 'https://api.example.com/auth'; // Replace with your backend API URL

  constructor() {}

  /*login(username: string, password: string) {
    // Implement login logic here, e.g., call to backend API
    // For demonstration, we'll just return a mock user
    if (username === 'admin' && password === 'admin') {
      return {
        id: '1',
        username: 'admin',
        email: '',
        role: 'admin',
        token: 'mock-jwt-token'
      };
    } else if (username === 'user' && password === 'user') {
      return {
        id: '2',
        username: 'user',
        email: 'user@example.com',
        role: 'user',
        token: 'mock-jwt-token'
      };
    }
    return null;
  }*/

  login(email: string, password: string) {
    return this.http
      .post<{ token: string; user: any }>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .subscribe((res) => {
        setUser({ ...res.user, token: res.token });
      });
  }

  logout() {
    // Implement logout logic here, e.g., remove token from storage
    clearUser();
  }
}
