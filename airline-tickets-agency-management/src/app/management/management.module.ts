import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ReportComponent } from './component/report/report.component';
import { HomeComponent } from '../client/component/home/home.component';
import { ManagementComponent } from './management/management.component';
import {AppModule} from '../app.module';
import {CommonClientModule} from '../common/common-client/common-client.module';
import { TicketListComponent } from './component/management-ticket/ticket-list/ticket-list.component';



@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    CommonClientModule,
  ],
  declarations: [ReportComponent, HomeComponent, ManagementComponent,TicketListComponent],
  bootstrap: [ManagementComponent]
})
export class ManagementModule { }
