import { Component, OnInit, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { LayoutStyle, UpdateMode } from '../../../../shared/base-module/models/update-tab.model';
import { ContactUpdateDialog } from '../contact-update/contact-update-dialog/contact-update.dialog';
import { BasePresenter } from '../../../../shared/base-module';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-ui',
  templateUrl: './contact.component.html'
})
export class ContactComponent extends BasePresenter<Contact> implements OnInit, OnChanges, OnDestroy {

  layoutStyle: LayoutStyle = 'page'; // 'dialog' | 'tabs' | 'page'
  entityIdName = 'id';

  // ---- For UpdateLayout = 'dialog'
  updateDialogRef: MatDialogRef<ContactUpdateDialog>;
  _unsubscribeAll: Subject<boolean> = new Subject<boolean>();

  constructor(public dialog: MatDialog) {
    super(dialog);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }

  openUpdateDialog(entity: Contact, mode: UpdateMode, entityId?: any) {

    this.updateDialogRef = this.dialog.open(ContactUpdateDialog, {
      disableClose: true,
      data:         { entity: entity }
    });

    this.updateDialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe((updatedEntity: Contact) => {
      this.save.emit(updatedEntity);
    });
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.unsubscribe();
  }
}
