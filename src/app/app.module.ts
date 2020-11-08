import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent     } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactsModule   } from './modules/contacts/contacts.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    ContactsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
