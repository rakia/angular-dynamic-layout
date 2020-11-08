import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ContactContainerComponent } from './modules/contacts/containers/contact-container.component';

const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  {
    path: 'contacts', component: ContactContainerComponent
    // loadChildren: () => import('./modules/contacts/contacts.module').then(m => m.ContactsModule)
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, enableTracing: false }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
