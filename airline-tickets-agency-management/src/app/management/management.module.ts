import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ReportComponent } from './component/report/report.component';
import { HomeComponent } from '../client/component/home/home.component';
import { ManagementComponent } from './management/management.component';

import {CommonClientModule} from '../common/common-client/common-client.module';
import { StatisticalComponent } from './component/statistical/statistical.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    CommonClientModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ReportComponent, HomeComponent, ManagementComponent, StatisticalComponent],
  bootstrap: [ManagementComponent]
})
export class ManagementModule { }
