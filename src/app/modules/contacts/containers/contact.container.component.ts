import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { Contact             } from '../models/contact.model';
import { ContactStoreService } from '../services/contact-store.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.container.component.html',
})
export class ContactContainerComponent implements OnInit, OnDestroy {

  dataList$:          Observable<Contact[]> = this.service.dataList$;
  entityWithDetails$: Observable<Contact>   = this.service.entityWithDetails$;

  constructor(public service: ContactStoreService) {}

  ngOnInit(): void {}

  save(entity: Contact): void {
    this.service.save(entity);
  }

  delete(id: any): void {
    this.service.delete(id);
  }

  getEntityById(id: any): void {
    this.service.getEntityById(id);
  }

  ngOnDestroy(): void {}
}
