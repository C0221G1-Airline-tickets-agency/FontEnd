import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsManipulationComponent} from './component/news/news-manipulation/news-manipulation.component';
import {ManagementComponent} from '../management/management/management.component';
import {ReportComponent} from '../management/component/report/report.component';
import {ClientComponent} from './client/client.component';
import {HomeComponent} from './component/home/home.component';

// tslint:disable-next-line:max-line-length
import {CustomerTransactionHistoryComponent} from './component/customer/customer-transaction-history/customer-transaction-history.component';
import {CustomerPaymentComponent} from './component/customer/customer-payment/customer-payment.component';


const routes: Routes = [
  {
    path: '', component: ClientComponent,
    children:
      [
        {
          path: '', component: HomeComponent
        },
        {
          path: 'news/manipulation', component: NewsManipulationComponent
        },
        {
          path: 'customer/transaction-history', component: CustomerTransactionHistoryComponent
        },
        {
          path: 'customer/payment', component: CustomerPaymentComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
