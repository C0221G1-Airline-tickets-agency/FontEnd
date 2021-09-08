import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { NewsManipulationComponent } from './component/news/news-manipulation/news-manipulation.component';
import { NewsReviewComponent } from './component/news/news-review/news-review.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ClientComponent} from './client/client.component';
import {CommonClientModule} from '../common/common-client/common-client.module';

import { BookingDetailsComponent } from './component/flight-ticket/buy-ticket/booking-details/booking-details.component';
import { PassengerInformationComponent } from './component/flight-ticket/buy-ticket/passenger-information/passenger-information.component';

import { FlightListComponent } from './component/flight-ticket/flight-management/flight-list/flight-list.component';
import { DialogDeleteComponent } from './component/flight-ticket/flight-management/dialog-delete/dialog-delete.component';


import { MatDialogModule } from '@angular/material/dialog';

import { DialogReturnComponent } from './component/flight-ticket/flight-management/dialog-return/dialog-return.component';
import {FlightCreateComponent} from "./component/flight-ticket/flight-management/flight-create/flight-create.component";
import {FlightEditComponent} from "./component/flight-ticket/flight-management/flight-edit/flight-edit.component";
import { AirlineCreateComponent } from './component/flight-ticket/flight-management/airline-create/airline-create.component';
import { AirlineListComponent } from './component/flight-ticket/flight-management/airline-list/airline-list.component';





@NgModule({

  declarations: [NewsManipulationComponent, NewsReviewComponent, ClientComponent, FlightListComponent
    , DialogDeleteComponent, BookingDetailsComponent, FlightCreateComponent,FlightEditComponent,PassengerInformationComponent, DialogReturnComponent, AirlineCreateComponent, AirlineListComponent],

    imports: [
        CommonModule,
        ClientRoutingModule,
        ReactiveFormsModule,
        CommonClientModule,
        MatDialogModule,
        FormsModule
    ],
  bootstrap: [ClientComponent]
})
export class ClientModule { }
