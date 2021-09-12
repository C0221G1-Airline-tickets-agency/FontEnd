import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { NewsManipulationComponent } from './component/news/news-manipulation/news-manipulation.component';
import { NewsReviewComponent } from './component/news/news-review/news-review.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ClientComponent} from './client/client.component';
import {CommonClientModule} from '../common/common-client/common-client.module';
import { FlightListComponent } from './component/flight-ticket/buy-ticket/flight-list/flight-list.component';
import {TicketDetailComponent} from "./component/flight-ticket/buy-ticket/ticket-detail/ticket-detail.component";
import { CustomerChangePasswordComponent } from './component/customer/customer-change-password/customer-change-password.component';



@NgModule({
  declarations: [NewsManipulationComponent, NewsReviewComponent, ClientComponent, FlightListComponent, TicketDetailComponent, CustomerChangePasswordComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    CommonClientModule,
    FormsModule
  ],
  bootstrap: [ClientComponent]
})
export class ClientModule { }
