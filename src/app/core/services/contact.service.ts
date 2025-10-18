import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  private readonly apiURL = 'https://whitesmoke-coyote-648419.hostingersite.com/api';

  constructor(private readonly http: HttpClient) {}

  //add contact
  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiURL, contact);
  }

  //get contact
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiURL}/contact-messages`);
  }

  //delete contact
  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/contact-messages/${id}`);
  }
}
