import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BaseModuleStoreService<T> {

  protected readonly _dataList          = new BehaviorSubject<T[]>([]);
  protected readonly _entityWithDetails = new BehaviorSubject<T>(null);
  protected readonly _savedEntity       = new BehaviorSubject<T>(null);
  readonly dataList$          = this._dataList.asObservable();
  readonly entityWithDetails$ = this._entityWithDetails.asObservable();
  readonly savedEntity$       = this._savedEntity.asObservable();

  constructor() {}

  search(searchQuery: any = '') {}

  save(entity: T) {}

  delete(id: any) {}

  getEntityById(id: any) {}

  getDataList(): T[] {
    return this._dataList.getValue();
  }
  protected _setDataList(data: T[]) {
    this._dataList.next(data);
  }

  getSavedEntity(): T {
    return this._savedEntity.getValue();
  }
  protected _setSavedEntity(entity: T) {
      this._savedEntity.next(entity);
  }

  getEntityWithDetails(): T {
    return this._entityWithDetails.getValue();
  }
  protected _setEntityWithDetails(entity: T) {
    this._entityWithDetails.next(entity);
  }
}
