import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ReportComponent } from './component/report/report.component';

import { ManagementComponent } from './management/management.component';
import {AppModule} from '../app.module';
import {CommonClientModule} from '../common/common-client/common-client.module';
import {HomeComponent} from '../client/component/home/home.component';




@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    CommonClientModule,
  ],
  declarations: [ReportComponent, ManagementComponent],
  bootstrap: [ManagementComponent]
})
export class ManagementModule { }
