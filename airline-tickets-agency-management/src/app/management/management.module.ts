import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ReportComponent } from './component/report/report.component';
import { HomeComponent } from '../client/component/home/home.component';
import { ManagementComponent } from './management/management.component';
import {AppModule} from '../app.module';
import {CommonClientModule} from '../common/common-client/common-client.module';
import { EmployeeComponent } from './component/employee/employee.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddEmployeeComponent } from './component/employee/add-employee/add-employee.component';



@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    CommonClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ReportComponent, HomeComponent, ManagementComponent, EmployeeComponent, AddEmployeeComponent],
  exports: [
    AddEmployeeComponent
  ],
  bootstrap: [ManagementComponent]
})
export class ManagementModule { }
