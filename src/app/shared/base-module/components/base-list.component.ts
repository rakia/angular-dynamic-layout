import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

import { UpdatePageData } from '../models/update-tab.model';

@Component({
  selector: 'base-list',
  template: ``
})
export class BaseList<T> implements OnInit, OnChanges {

  @Input()  dataList:     T[];
  @Input()  savedEntity:  T;
  @Output() saveEntity    = new EventEmitter<T>();
  @Output() gotoUpdate    = new EventEmitter<UpdatePageData<T>>();
  @Output() getEntityById = new EventEmitter<any>();
  @Output() deleteEntity  = new EventEmitter<any>();
  @Output() search        = new EventEmitter<void>();

  displayColumnDefs: any[];
  displayedColumns: string[];

  constructor() {}

  ngOnInit(): void {
    this.displayedColumns = this.displayColumnDefs.map(col => col.key);
    this.displayedColumns.push('edit');
    this.displayedColumns.push('delete');
  }

  ngOnChanges(changes: SimpleChanges): void {}

  onSearch() {
    this.search.emit();
  }

  createNewRow(): void {
    this.gotoUpdate.emit({ mode: 'create', entity: {} as T });
  }

  editRow(row: T): void {
    const entity: T = Object.assign({}, row); // clone row to avoid changing it when entity is updated
    this.gotoUpdate.emit({ mode: 'edit', entity: entity });
  }

  deleteRow(row: T, entityIdName: string) {
   this.deleteEntity.emit(row[entityIdName]);
  }

}
