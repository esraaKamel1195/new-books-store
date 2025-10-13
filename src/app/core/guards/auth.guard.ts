import { CanMatchFn } from "@angular/router";

export const authGuard: CanMatchFn = () => {
  const token = localStorage.getItem('token');
  return !!token;
}
