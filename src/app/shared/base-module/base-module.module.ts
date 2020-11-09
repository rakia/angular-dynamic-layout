import { NgModule } from '@angular/core';

import { AngularMaterialModule  } from '../angular-material.module';
import { BaseModuleStoreService } from './services';
import { BaseContainer          } from './components/base-container.component';
import { BasePresenter          } from './components/base-presenter.component';
import { BaseList               } from './components/base-list.component';
import { DynamicLayoutComponent } from './components/dynamic-layout/dynamic-layout.component';

@NgModule({
  declarations: [
    BaseContainer,
    BasePresenter,
    BaseList,
    DynamicLayoutComponent
  ],
  imports: [
      AngularMaterialModule
  ],
  exports: [
    BaseContainer,
    BasePresenter,
    BaseList,
    DynamicLayoutComponent
  ],
  entryComponents: [],
  providers: [ BaseModuleStoreService ]
})
export class BaseModule {}
