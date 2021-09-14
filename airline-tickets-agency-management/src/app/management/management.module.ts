import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ReportComponent } from './component/report/report.component';

import { ManagementComponent } from './management/management.component';
import {CommonClientModule} from '../common/common-client/common-client.module';
import { CustomerComponent } from './component/ business/customer/customer.component';
import { DeleteCustomerComponent } from './component/ business/delete-customer/delete-customer.component';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';

import { CreateCustomerComponent } from './component/ business/create-customer/create-customer.component';
import { EditCustomerComponent } from './component/ business/edit-customer/edit-customer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomPipe} from './custom-pipe';
import { TicketEditComponent } from './component/management-ticket/ticket-edit/ticket-edit.component';
import { TicketPrintComponent } from './component/management-ticket/ticket-print/ticket-print.component';
import {TicketListComponent} from './component/management-ticket/ticket-list/ticket-list.component';





@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    CommonClientModule,
    ToastrModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ReportComponent, ManagementComponent, CustomerComponent, DeleteCustomerComponent,
    CreateCustomerComponent, EditCustomerComponent, CustomPipe,
    TicketEditComponent, TicketPrintComponent, TicketListComponent ],

  bootstrap: [ManagementComponent]
})
export class ManagementModule { }
