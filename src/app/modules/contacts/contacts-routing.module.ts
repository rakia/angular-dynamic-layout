import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactContainerComponent } from './containers/contact.container.component';

const routes: Routes = [
  { path: '', component: ContactContainerComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ContactsRoutingModule {}
