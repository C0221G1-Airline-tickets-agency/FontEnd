import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { NewsManipulationComponent } from './component/news/news-manipulation/news-manipulation.component';
import { NewsReviewComponent } from './component/news/news-review/news-review.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ClientComponent} from './client/client.component';
import {CommonClientModule} from '../common/common-client/common-client.module';
import { CustomerPaymentComponent } from './component/customer/customer-payment/customer-payment.component';
// tslint:disable-next-line:max-line-length
import { CustomerTransactionHistoryComponent } from './component/customer/customer-transaction-history/customer-transaction-history.component';
// tslint:disable-next-line:max-line-length
import { CustomerDialogCancelTicketComponent } from './component/customer/customer-dialog-cancel-ticket/customer-dialog-cancel-ticket.component';



@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [NewsManipulationComponent, NewsReviewComponent, ClientComponent, CustomerPaymentComponent, CustomerTransactionHistoryComponent, CustomerDialogCancelTicketComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    CommonClientModule
  ],
  bootstrap: [ClientComponent]
})
export class ClientModule { }
