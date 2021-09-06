import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { NewsManipulationComponent } from './component/news/news-manipulation/news-manipulation.component';
import { NewsReviewComponent } from './component/news/news-review/news-review.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

import {ClientComponent} from './client/client.component';
import {CommonClientModule} from '../common/common-client/common-client.module';

import { BookingDetailsComponent } from './component/flight-ticket/buy-ticket/booking-details/booking-details.component';
import { PassengerInformationComponent } from './component/flight-ticket/buy-ticket/passenger-information/passenger-information.component';

import { FlightListComponent } from './component/flight-ticket/flight-management/flight-list/flight-list.component';
import { DialogDeleteComponent } from './component/flight-ticket/flight-management/dialog-delete/dialog-delete.component';
import {MatDialogModule} from '@angular/material/dialog';




@NgModule({
  declarations: [NewsManipulationComponent, NewsReviewComponent, ClientComponent, FlightListComponent
    , DialogDeleteComponent, BookingDetailsComponent, PassengerInformationComponent],

  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    CommonClientModule,
    MatDialogModule
  ],
  bootstrap: [ClientComponent]
})
export class ClientModule { }
