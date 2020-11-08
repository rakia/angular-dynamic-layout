import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Contact } from '../models/contact.model';
import { ContactService } from './contact.service';

@Injectable()
export class ContactStoreService {

  private readonly _dataList          = new BehaviorSubject<Contact[]>([]);
  private readonly _entityWithDetails = new BehaviorSubject<Contact>(null);
  private readonly _savedEntity       = new BehaviorSubject<Contact>(null);
  readonly dataList$          = this._dataList.asObservable();
  readonly entityWithDetails$ = this._entityWithDetails.asObservable();
  readonly savedEntity$       = this._savedEntity.asObservable();

  constructor(private service: ContactService) {
    this.search();
  }

  async search(): Promise<void> {
    await this.service.search().toPromise().then((response: Contact[]) => {
      this._setDataList(response);
    });
  }

  async save(entity: Contact) {
    await this.service.save(entity).toPromise().then((response: Contact) => {
      this._setSavedEntity(response);
      this.search();
    });
  }

  async getEntityById(id: number) {
    await this.service.getEntityById(id).toPromise().then((response: Contact) => {
      this._setEntityWithDetails(response);
    });
  }

  async delete(id: number) {
    const filteredList = this.getDataList().filter(entity => entity.id !== id);
    this._setDataList(filteredList);
    /*await this.service.deleteEntity(id).toPromise().then((response) => {
        this.search();
    });*/
  }

  getDataList(): Contact[] {
    return this._dataList.getValue();
  }
  private _setDataList(data: Contact[]) {
    this._dataList.next(data);
  }

  getSavedEntity(): Contact {
    return this._savedEntity.getValue();
  }
  private _setSavedEntity(entity: Contact) {
    this._savedEntity.next(entity);
  }

  getEntityWithDetails(): Contact {
    return this._entityWithDetails.getValue();
  }
  private _setEntityWithDetails(entity: Contact) {
    this._entityWithDetails.next(entity);
  }
}
