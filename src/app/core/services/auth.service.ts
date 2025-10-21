import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { clearUser, setUser } from '@features/state/auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  apiUrl = environment.backendUrl;

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
