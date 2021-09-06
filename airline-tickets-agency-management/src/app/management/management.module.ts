import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ReportComponent } from './component/report/report.component';
import { HomeComponent } from './component/home/home.component';
import { AdminInfoComponent } from './component/admin/admin-info/admin-info.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminChangePasswordComponent} from './component/admin/admin-change-password/admin-change-password.component';





@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [ReportComponent, HomeComponent, AdminInfoComponent, AdminChangePasswordComponent]
})
export class ManagementModule { }
