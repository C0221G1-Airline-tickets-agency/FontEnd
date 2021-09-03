import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ReportComponent } from './component/report/report.component';
import { HomeComponent } from './component/home/home.component';



@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule
  ],
  declarations: [ReportComponent, HomeComponent]
})
export class ManagementModule { }
