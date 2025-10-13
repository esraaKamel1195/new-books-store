import { computed, signal } from '@angular/core';
import { User } from './user.interface';

export const currentUser = signal<User | null>(null);
export const isAuthenticated = computed<boolean>(() => !!currentUser());
export const isAdmin = computed<boolean>(() => currentUser()?.role === 'admin');

export function setUser(user: User | null) {
  if (user) {
    localStorage.removeItem('token');
    localStorage.setItem('token', user.token);
    currentUser.set(user);
  }
}

export function clearUser() {
  localStorage.removeItem('token');
  currentUser.set(null);
}

