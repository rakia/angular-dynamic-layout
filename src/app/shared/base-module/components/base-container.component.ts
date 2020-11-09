import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseModuleStoreService } from '../services';

@Component({
  selector: 'base-container',
  template: ``
})
export class BaseContainer<T> implements OnInit {

  dataList$:          Observable<T[]> = this.service.dataList$;
  entityWithDetails$: Observable<T>   = this.service.entityWithDetails$;
  savedEntity$:       Observable<T>   = this.service.savedEntity$;

  constructor(public service: BaseModuleStoreService<T>) {}

  ngOnInit(): void {}

  search() {
    this.service.search();
  }

  save(entity: T) {
    this.service.save(entity);
  }

  delete(id: any) {
    this.service.delete(id);
  }

  getEntityById(id: any) {
    this.service.getEntityById(id);
  }

}
