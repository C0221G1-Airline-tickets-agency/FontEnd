import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ReportComponent } from './component/report/report.component';
import { HomeComponent } from '../client/component/home/home.component';
import { ManagementComponent } from './management/management.component';
import {AppModule} from '../app.module';
import {CommonClientModule} from '../common/common-client/common-client.module';
import { CustomerComponent } from './component/customer/customer.component';
import { DeleteCustomerComponent } from './component/delete-customer/delete-customer.component';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {CustomPipe} from './custom-pipe';



@NgModule({
    imports: [
        CommonModule,
        ManagementRoutingModule,
        CommonClientModule,
        ToastrModule,
        MatDialogModule,
        FormsModule
    ],
  declarations: [ReportComponent, HomeComponent, ManagementComponent, CustomerComponent, DeleteCustomerComponent, CustomPipe],
  bootstrap: [ManagementComponent]
})
export class ManagementModule { }
