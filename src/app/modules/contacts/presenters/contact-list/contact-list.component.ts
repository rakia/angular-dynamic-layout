import { Component, OnInit, SimpleChanges, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Contact } from '../../models/contact.model';
import { UpdatePageData } from '../../../../layout/models/update-tab.model';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnChanges {

  @Input()  dataList:     Contact[];
  @Input()  savedEntity:  Contact;
  @Output() saveEntity    = new EventEmitter<Contact>();
  @Output() gotoUpdate    = new EventEmitter<UpdatePageData<Contact>>();
  @Output() getEntityById = new EventEmitter<any>();
  @Output() deleteEntity  = new EventEmitter<any>();
  @Output() search        = new EventEmitter<void>();

  displayColumnDefs = [
    { key: 'id',       label: 'ID'        },
    { key: 'name',     label: 'Name'      },
    { key: 'lastName', label: 'Last name' },
    { key: 'jobTitle', label: 'Job Title' }
  ];
  displayedColumns: string[];

  constructor() {}

  ngOnInit() {
    this.displayedColumns = this.displayColumnDefs.map(col => col.key);
    this.displayedColumns.push('edit');
    this.displayedColumns.push('delete');
  }

  ngOnChanges(changes: SimpleChanges): void {}

  onSearch() {
    this.search.emit();
  }

  createNewRow(): void {
    this.gotoUpdate.emit({ mode: 'create', entity: new Contact() });
  }

  editRow(row: Contact): void {
    const entity: Contact = Object.assign({}, row); // clone row to avoid changing it when entity is updated
    this.gotoUpdate.emit({ mode: 'edit', entity: entity });
  }

  deleteRow(row: Contact) {
    this.deleteEntity.emit(row.id);
  }
}
