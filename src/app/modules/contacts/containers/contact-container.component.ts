import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { Contact             } from '../models/contact.model';
import { ContactStoreService } from '../services/contact-store.service';
import { BaseContainer       } from '../../../shared/base-module';

@Component({
  selector: 'contact',
  templateUrl: './contact-container.component.html',
})
export class ContactContainerComponent extends BaseContainer<Contact> implements OnInit, OnDestroy {


  constructor(public service: ContactStoreService) {
    super(service);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {}
}
