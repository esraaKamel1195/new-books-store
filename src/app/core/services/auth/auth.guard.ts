import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(route: any): boolean {
    const userRole = this.authService.getUserRole();
    const token = this.authService.getToken();
    const expectedRole: Array<string> = route.data['role'];
    console.log('token', token);
    console.log('userRole', userRole);
    console.log('expectedRole', expectedRole);

    if (!token && (!userRole || !expectedRole.includes(userRole))) {
      console.log('step 1');
      this.router.navigate(['/auth/login']);
      return false;
    } else if (expectedRole === undefined && userRole && token) {
      console.log('step 2');
      return true;
    } else {
      console.log('step 3');
      return true;
    }
  }
}
