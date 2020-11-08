import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { UpdateLayout, UpdateMode, UpdateTab } from '../models/update-tab.model';

@Component({
  selector: 'dynamic-layout',
  templateUrl: './dynamic-layout.component.html',
  styleUrls: ['./dynamic-layout.component.scss']
})
export class DynamicLayoutComponent<T> implements OnInit {

  @Input() updateLayout: UpdateLayout;
  @Input() entity: T;
  @Input() mode: UpdateMode;
  @Input() showList: boolean;
  @Input() showUpdate: boolean;

  // ---- For UpdateLayout = 'tabs'
  @Input() updateTabs: UpdateTab<T>[] = [];
  @Input() selectedTabIndex = 0;
  @Output() removeUpdateTab = new EventEmitter<number>();

  // ---- For UpdateLayout = 'page'
  @Output() gotoList = new EventEmitter<void>();
  @Output() save = new EventEmitter<T>();

  constructor() {}

  ngOnInit(): void {}

  onGotoList(): void {
    this.gotoList.emit();
  }

}
