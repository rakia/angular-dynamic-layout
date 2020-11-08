import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CONTACTS } from './contacts';
import { Contact  } from '../models/contact.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ContactService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  search(): Observable<Contact[]> {
    return of(CONTACTS); // this.http.post<Contact[]>(this.apiUrl + 'contacts', {});
  }

  getEntityById(id: number): Observable<Contact> {
    return of(CONTACTS.find(contact => contact.id === id));
    // this.http.post<Contact>(this.apiUrl + `contacts/${id}`, {});
  }

  save(entity: Contact): Observable<Contact>{
    return this.http.post<Contact>(this.apiUrl + `contacts/save`, entity);
  }

  deleteEntity(id: number): Observable<void> {
    return this.http.get<void>(this.apiUrl + `contacts/delete/${id}`);
  }

}
