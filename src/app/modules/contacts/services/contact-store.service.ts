import { Injectable } from '@angular/core';

import { Contact } from '../models/contact.model';
import { ContactService } from './contact.service';
import { BaseModuleStoreService } from '../../../shared/base-module/services';

@Injectable()
export class ContactStoreService extends BaseModuleStoreService<Contact> {

  constructor(private service: ContactService) {
    super();
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

}
