import { NgModule } from '@angular/core';

import { AngularMaterialModule  } from '../shared/angular-material.module';
import { DynamicLayoutComponent } from './dynamic-layout/dynamic-layout.component';

@NgModule({
  declarations: [
    DynamicLayoutComponent
  ],
  imports: [ AngularMaterialModule  ],
  exports: [ DynamicLayoutComponent ],
  providers: [],
  entryComponents: []
})
export class LayoutModule {}
