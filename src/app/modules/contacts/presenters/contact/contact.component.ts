import { Component, OnInit, Input, SimpleChanges, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { UpdateLayout, UpdateMode, UpdatePageData, UpdateTab } from '../../../../layout/models/update-tab.model';
import { ContactUpdateDialog } from '../contact-update/contact-update-dialog/contact-update.dialog';
import { UpdateDialogData } from '../../../../layout/models/update-dialog-data.model';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-ui',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit, OnChanges, OnDestroy {

  @Input()  dataList:          Contact[];
  @Input()  savedEntity:       Contact;
  @Input()  entityWithDetails: Contact;
  @Output() getEntityById = new EventEmitter<number>();
  @Output() delete        = new EventEmitter<number>();
  @Output() save          = new EventEmitter<Contact>();
  @Output() search        = new EventEmitter<void>();

  updateLayout: UpdateLayout = 'page'; // 'dialog' | 'tabs' | 'page'

  // ---- For UpdateLayout = 'page'
  showList:       boolean = true;
  showUpdate:     boolean = false;
  updatePageData: UpdatePageData<Contact>;

  // ---- For UpdateLayout = 'tabs'
  updateTabs: UpdateTab<Contact>[] = [];
  selectedTabIndex: number = 0;

  // ---- For UpdateLayout = 'dialog'
  dialogData:      UpdateDialogData<Contact>;
  updateDialogRef: MatDialogRef<ContactUpdateDialog>;

  _unsubscribeAll: Subject<boolean> = new Subject<boolean>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.entityWithDetails && changes.entityWithDetails.currentValue) {
      this.openUpdatePage(this.entityWithDetails, 'edit');
    }

    if (changes.saved && changes.saved.currentValue) {
      if (this.updateLayout === 'dialog') {
        this.updateDialogRef?.close();
      }
      if (this.updateLayout === 'tabs') {
        this.removeUpdateTab(this.selectedTabIndex);
      }
      if (this.updateLayout === 'page') {
        this.gotoList(this.savedEntity);
      }
    }
  }

  gotoUpdate(data: UpdatePageData<Contact>) {
    this.dialogData = { entity: data.entity };

    if (data.mode === 'create') {
      this.openUpdatePage(data.entity, data.mode);

    } else if (data.mode === 'edit') {
      if (this.updateLayout === 'tabs') {

        // If there is already an existing updateTab for this accReceipt.ReceiptNo, then go to it
        const updateTab: UpdateTab<Contact> =
          this.updateTabs.find(tab => tab.key === data.entity.id);

        if (updateTab) {
          this.selectedTabIndex = updateTab.index;
          console.log('updateTab ' + data.entity.id + ' exists --> index: ' + updateTab.index);
        } else {
          this.getEntityById.emit( data.entity.id );
        }

      } else { // updateLayout = 'dialog' or 'page'
        this.getEntityById.emit( data.entity.id );
      }
    }
  }

  openUpdatePage(entity: Contact, mode: UpdateMode, entityId?: any) {
    switch (this.updateLayout) {
      case 'dialog':
        this.openUpdateDialog(entity, mode, entityId);
        break;
      case 'tabs':
        this.createUpdateTab(entity, mode);
        break;
      case 'page':
        this.prepareUpdateData(entity, mode);
        break;
      default:
        break;
    }
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

  createUpdateTab(entity: Contact, mode: UpdateMode) {
    // If there is already an existing updateTab for this entity, then go to it
    const updateTab: UpdateTab<Contact> = this.updateTabs.find(tab => tab.key === entity.id);

    if (updateTab) {
      updateTab.updateTabData = { mode: mode, entity: entity };
      this.selectedTabIndex   = updateTab.index;
    } else {
      const newUpdateTab: UpdateTab<Contact> = {
        key:           entity.id || 'new',
        index:         (this.updateTabs.length + 1),
        updateTabData: { mode: mode, entity: entity }
      };
      this.updateTabs.push(newUpdateTab);
      this.selectedTabIndex = this.updateTabs.length;
    }
  }

  removeUpdateTab(index: number) {
    this.updateTabs.splice(index, 1);
  }

  prepareUpdateData(entity: Contact, mode: UpdateMode) {
    this.showUpdate     = true;
    this.showList       = false;
    this.updatePageData = { mode: mode, entity: entity };
  }

  gotoList(entity?: Contact) {
    this.showList   = true;
    this.showUpdate = false;
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.unsubscribe();
  }
}
