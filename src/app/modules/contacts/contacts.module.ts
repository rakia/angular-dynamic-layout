import { NgModule } from '@angular/core';

import { AngularMaterialModule     } from '../../shared/angular-material.module';
import { BaseModule                } from '../../shared/base-module/base-module.module';
import { ContactContainerComponent } from './containers/contact-container.component';
import { ContactListComponent      } from './presenters/contact-list/contact-list.component';
import { ContactComponent          } from './presenters/contact/contact.component';
import { ContactStoreService       } from './services/contact-store.service';
import { ContactService            } from './services/contact.service';
import { ContactUpdateDialog       } from './presenters/contact-update/contact-update-dialog/contact-update.dialog';
import { ContactForm               } from './presenters/contact-update/contact-form/contact-form';
import { ContactsRoutingModule     } from './contacts-routing.module';

@NgModule({
  declarations: [
    ContactContainerComponent,
    ContactListComponent,
    ContactComponent,
    ContactUpdateDialog,
    ContactForm
  ],
  imports: [
    ContactsRoutingModule,
    AngularMaterialModule,
    BaseModule
  ],
  providers: [
    ContactService,
    ContactStoreService,
  ],
  entryComponents: [ ContactUpdateDialog ]
})
export class ContactsModule {}
