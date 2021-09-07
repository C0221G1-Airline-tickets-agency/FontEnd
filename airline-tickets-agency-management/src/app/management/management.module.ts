import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ReportComponent } from './component/report/report.component';
import { HomeComponent } from '../client/component/home/home.component';
import { ManagementComponent } from './management/management.component';
import {AppModule} from '../app.module';
import {CommonClientModule} from '../common/common-client/common-client.module';
import { TicketListComponent } from './component/management-ticket/ticket-list/ticket-list.component';
import { TicketEditComponent } from './component/management-ticket/ticket-edit/ticket-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import { TicketPrintComponent } from './component/management-ticket/ticket-print/ticket-print.component';



@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    CommonClientModule,
    ReactiveFormsModule,
  ],
  declarations: [ReportComponent, HomeComponent, ManagementComponent,TicketListComponent, TicketEditComponent, TicketPrintComponent],
  bootstrap: [ManagementComponent]
})
export class ManagementModule { }
