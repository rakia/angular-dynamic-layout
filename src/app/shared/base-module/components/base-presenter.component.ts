import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject   } from 'rxjs';

import { LayoutStyle, UpdateMode, UpdatePageData, UpdateTab } from '../models/update-tab.model';
import { ContactUpdateDialog } from '../../../modules/contacts/presenters/contact-update/contact-update-dialog/contact-update.dialog';

@Component({
  selector: 'base-presenter',
  template: ``
})
export class BasePresenter<T> implements OnInit, OnChanges, OnDestroy {

  @Input()  dataList:          T[];
  @Input()  savedEntity:       T;
  @Input()  entityWithDetails: T;
  @Output() getEntityById = new EventEmitter<any>();
  @Output() save          = new EventEmitter<T>();
  @Output() delete        = new EventEmitter<any>();
  @Output() search        = new EventEmitter<void>();

  layoutStyle: LayoutStyle = 'dialog'; // default Layout is 'dialog'
  entityIdName: string;

  // ---- For MaintenanceLayout = 'page'
  showList:       boolean = true;
  showUpdate:     boolean = false;
  updatePageData: UpdatePageData<T>;

  // ---- For MaintenanceLayout = 'tabs'
  updateTabs: UpdateTab<T>[] = [];
  selectedTabIndex: number = 0;

  // ---- For MaintenanceLayout = 'dialog'
  updateDialogRef: MatDialogRef<ContactUpdateDialog>;

  constructor(public dialog?: MatDialog) {}

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

  gotoUpdate(data: UpdatePageData<T>) {

    if (data.mode === 'create') {
      this.openUpdatePage(data.entity, data.mode);

    } else if (data.mode === 'edit') {
      if (this.layoutStyle === 'tabs') {

        // If there is already an existing updateTab for this accReceipt.ReceiptNo, then go to it
        const updateTab: UpdateTab<T> = this.updateTabs.find(tab => tab.key === data.entity[this.entityIdName]);

        if (updateTab) {
          this.selectedTabIndex = updateTab.index;
          console.log('updateTab ' + data.entity[this.entityIdName] + ' exists --> index: ' + updateTab.index);
        } else {
          this.getEntityById.emit( data.entity[this.entityIdName] );
        }

      } else { // updateLayout = 'dialog' or 'page'
        this.getEntityById.emit( data.entity[this.entityIdName] );
      }
    }
  }

  openUpdatePage(entity: T, mode: UpdateMode, entityId?: any) {
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

  openUpdateDialog(entity: T, mode: UpdateMode, entityId?: any) {}

  createUpdateTab(entity: T, mode: UpdateMode) {
    // If there is already an existing updateTab for this entity, then go to it
    const updateTab: UpdateTab<T> = this.updateTabs.find(tab => tab.key === entity[this.entityIdName]);

    if (updateTab) {
      updateTab.updateTabData = { mode: mode, entity: entity };
      this.selectedTabIndex   = updateTab.index;
    } else {
      const newUpdateTab: UpdateTab<T> = {
        key:           entity[this.entityIdName] || 'new',
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

  prepareUpdateData(entity: T, mode: UpdateMode) {
    this.showUpdate     = true;
    this.showList       = false;
    this.updatePageData = { mode: mode, entity: entity };
  }

  gotoList(entity?: T) {
    this.showList   = true;
    this.showUpdate = false;
  }

  ngOnDestroy() {}

}
