import { CanActivateChildFn } from '@angular/router';

export const canActivateChildGuard: CanActivateChildFn = (
  childRoute,
  state
) => {
  const token = localStorage.getItem('token');
  return !!token;
};
