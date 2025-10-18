import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedHTTPService } from './shared-http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly sharedHttpService: SharedHTTPService) { }

  getUsers(): Observable<any> {
    return this.sharedHttpService.get(`users`);
  }

  getCurrentUser(): Observable<any> {
    return this.sharedHttpService.get(`users/currentuser`);
  }

  deleteUser(id: any): Observable<any> {
    return this.sharedHttpService.delete(`users/${id}`);
  }
}
