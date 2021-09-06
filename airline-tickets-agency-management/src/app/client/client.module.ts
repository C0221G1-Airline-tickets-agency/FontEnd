import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { NewsManipulationComponent } from './component/news/news-manipulation/news-manipulation.component';
import { NewsReviewComponent } from './component/news/news-review/news-review.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

import {ClientComponent} from './client/client.component';
import {CommonClientModule} from '../common/common-client/common-client.module';
import { FlightListComponent } from './component/flight-ticket/flight-management/flight-list/flight-list.component';
import { DialogDeleteComponent } from './component/flight-ticket/flight-management/dialog-delete/dialog-delete.component';
import { FlightCreateComponent } from './component/flight-ticket/flight-management/flight-create/flight-create.component';
import { FlightEditComponent } from './component/flight-ticket/flight-management/flight-edit/flight-edit.component';



@NgModule({
  declarations: [NewsManipulationComponent, NewsReviewComponent, ClientComponent, FlightListComponent, DialogDeleteComponent, FlightCreateComponent, FlightEditComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    CommonClientModule
  ],
  bootstrap: [ClientComponent]
})
export class ClientModule { }
