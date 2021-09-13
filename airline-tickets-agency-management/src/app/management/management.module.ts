import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ReportComponent } from './component/report/report.component';
import { HomeComponent } from '../client/component/home/home.component';
import { ManagementComponent } from './management/management.component';
import {AppModule} from '../app.module';
import {CommonClientModule} from '../common/common-client/common-client.module';
import {AddEmployeeComponent} from './component/employee/add-employee/add-employee.component';
import {UpdateEmployeeComponent} from './component/employee/update-employee/update-employee.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EmployeeComponent} from './component/employee/employee.component';



@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    CommonClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [ReportComponent, HomeComponent, ManagementComponent, EmployeeComponent, AddEmployeeComponent, UpdateEmployeeComponent],
  bootstrap: [ManagementComponent]
})
export class ManagementModule { }
