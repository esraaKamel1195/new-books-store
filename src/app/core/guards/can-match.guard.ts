import { CanMatchFn } from '@angular/router';

export const canMatchGuard: CanMatchFn = (route, segments) => {
  const token = localStorage.getItem('token');
  return !!token;
};
