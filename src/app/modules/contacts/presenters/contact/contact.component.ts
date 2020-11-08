import { Component, OnInit, Input, SimpleChanges, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { LayoutStyle, UpdateMode, UpdatePageData, UpdateTab } from '../../../../layout/models/update-tab.model';
import { ContactUpdateDialog } from '../contact-update/contact-update-dialog/contact-update.dialog';
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

  layoutStyle: LayoutStyle = 'dialog'; // 'dialog' | 'tabs' | 'page'

  // ---- For UpdateLayout = 'page'
  showList:       boolean = true;
  showUpdate:     boolean = false;
  updatePageData: UpdatePageData<Contact>;

  // ---- For UpdateLayout = 'tabs'
  updateTabs: UpdateTab<Contact>[] = [];
  selectedTabIndex: number = 0;

  // ---- For UpdateLayout = 'dialog'
  updateDialogRef: MatDialogRef<ContactUpdateDialog>;

  _unsubscribeAll: Subject<boolean> = new Subject<boolean>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.entityWithDetails && changes.entityWithDetails.currentValue) {
      this.openUpdatePage(this.entityWithDetails, 'edit');
    }

    if (changes.saved && changes.saved.currentValue) {
      if (this.layoutStyle === 'dialog') {
        this.updateDialogRef?.close();
      }
      if (this.layoutStyle === 'tabs') {
        this.removeUpdateTab(this.selectedTabIndex);
      }
      if (this.layoutStyle === 'page') {
        this.gotoList(this.savedEntity);
      }
    }
  }

  gotoUpdate(data: UpdatePageData<Contact>) {

    if (data.mode === 'create') {
      this.openUpdatePage(data.entity, data.mode);

    } else if (data.mode === 'edit') {
      if (this.layoutStyle === 'tabs') {

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
    switch (this.layoutStyle) {
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
