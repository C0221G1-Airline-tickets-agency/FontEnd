import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ReportComponent } from './component/report/report.component';
import { HomeComponent } from '../client/component/home/home.component';
import { ManagementComponent } from './management/management.component';
import {AppModule} from '../app.module';
import {CommonClientModule} from '../common/common-client/common-client.module';
import { EmployeeInformationComponent } from './component/employee-information/employee-information.component';
import { EmployeeChangePasswordComponent } from './component/employee-change-password/employee-change-password.component';



@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    CommonClientModule,
  ],
  declarations: [ReportComponent, HomeComponent, ManagementComponent, EmployeeInformationComponent, EmployeeChangePasswordComponent],
  bootstrap: [ManagementComponent]
})
export class ManagementModule { }
