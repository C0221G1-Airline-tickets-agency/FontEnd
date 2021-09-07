import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [TicketListComponent],
  imports: [
    CommonModule,
    TicketRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TicketModule { }
