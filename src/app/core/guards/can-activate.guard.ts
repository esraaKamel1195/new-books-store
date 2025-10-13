import { CanActivateFn } from '@angular/router';

export const canActivateGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  return !!token;
};
