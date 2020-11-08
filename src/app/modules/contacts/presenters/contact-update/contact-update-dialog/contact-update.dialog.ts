import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Contact } from '../../../models/contact.model';
import { UpdateDialogData } from '../../../../../layout/models/update-dialog-data.model';

@Component({
  selector: 'contact-update',
  templateUrl: './contact-update.dialog.html'
})
export class ContactUpdateDialog implements OnInit {

  entity: Contact;

  constructor(public dialogRef: MatDialogRef<ContactUpdateDialog>, @Inject(MAT_DIALOG_DATA) public data: UpdateDialogData<Contact>) {}

  ngOnInit(): void {
    this.entity = this.data.entity;
  }

  save(entity: Contact): void {
    this.dialogRef.close(entity);
  }
}
