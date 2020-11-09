import { Component, OnInit, SimpleChanges, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { BaseList } from '../../../../shared/base-module';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent extends BaseList<Contact> implements OnInit, OnChanges {

  displayColumnDefs = [
    { key: 'id',       label: 'ID'        },
    { key: 'name',     label: 'Name'      },
    { key: 'lastName', label: 'Last name' },
    { key: 'jobTitle', label: 'Job Title' }
  ];
  displayedColumns: string[];

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {}

}
