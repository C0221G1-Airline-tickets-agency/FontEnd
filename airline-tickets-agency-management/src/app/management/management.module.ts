import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ReportComponent } from './component/report/report.component';
import { HomeComponent } from '../client/component/home/home.component';
import { ManagementComponent } from './management/management.component';
import {AppModule} from '../app.module';
import {CommonClientModule} from '../common/common-client/common-client.module';
import {ClientModule} from "../client/client.module";



@NgModule({
    imports: [
        CommonModule,
        ManagementRoutingModule,
        CommonClientModule,
        ClientModule,
    ],
  declarations: [ReportComponent, HomeComponent, ManagementComponent],
  bootstrap: [ManagementComponent]
})
export class ManagementModule { }
