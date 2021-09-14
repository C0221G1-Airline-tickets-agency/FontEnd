import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsManipulationComponent} from './component/news/news-manipulation/news-manipulation.component';

import {ClientComponent} from './client/client.component';
import {HomeComponent} from './component/home/home.component';
import {FlightListComponent} from './component/flight-ticket/buy-ticket/flight-list/flight-list.component';
import {CustomerChangePasswordComponent} from './component/customer/customer-change-password/customer-change-password.component';

import {DestinationDetailComponent} from './component/destination-detail/destination-detail.component';

import {TestComponent} from './component/test/test.component';

import {NewsListComponent} from './component/news/news-list/news-list.component';
import {NewsDetailsComponent} from './component/news/news-details/news-details.component';

import {AdminAuthService} from '../service/auth/admin-auth.service';
import {DestinationCreateComponent} from './component/destination/destination-create/destination-create.component';
import {DestinationUpdateComponent} from './component/destination/destination-update/destination-update.component';
import {ManageChatRoomComponent} from "./component/adminInbox/manage-chat-room/manage-chat-room.component";

import {FlightListComponent} from './component/flight-ticket/flight-management/flight-list/flight-list.component';
import {BookingDetailsComponent} from './component/flight-ticket/buy-ticket/booking-details/booking-details.component';
import {PassengerInformationComponent} from './component/flight-ticket/buy-ticket/passenger-information/passenger-information.component';
import {FlightCreateComponent} from './component/flight-ticket/flight-management/flight-create/flight-create.component';
import {FlightEditComponent} from './component/flight-ticket/flight-management/flight-edit/flight-edit.component';
import {AirlineListComponent} from './component/flight-ticket/flight-management/airline-list/airline-list.component';
import {AirlineCreateComponent} from './component/flight-ticket/flight-management/airline-create/airline-create.component';


// tslint:disable-next-line:max-line-length
import {CustomerTransactionHistoryComponent} from './component/customer/customer-transaction-history/customer-transaction-history.component';
import {CustomerPaymentComponent} from './component/customer/customer-payment/customer-payment.component';
import {CustomerChangePasswordComponent} from './component/customer/customer-change-password/customer-change-password.component';




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
          path: 'search-flight', component: FlightListComponent
        },
        {
          path: 'customer', component: CustomerChangePasswordComponent 
        },
        {

          path: 'news/news-list', component: NewsListComponent
        },
        {
          path: 'news/news-details/:id', component: NewsDetailsComponent
        },
        {
          path: 'news/manipulation', component: NewsManipulationComponent, canActivate: [AdminAuthService]
        },
        {
          path: 'news/manipulation/:id', component: NewsManipulationComponent, canActivate: [AdminAuthService]
        },
        {
          path: 'destination/detail/:id', component: DestinationDetailComponent
        },
        {
          path: 'destination/create-destination', component: DestinationCreateComponent
        },
        {
          path: 'destination/edit-destination/:id', component: DestinationUpdateComponent
        },
        {
          path:'roomAdmin',component:ManageChatRoomComponent},

        {
          path: 'customer/transaction-history', component: CustomerTransactionHistoryComponent
        },
        {
          path: 'customer/payment', component: CustomerPaymentComponent

        },
        {
          path: 'flight-management', component: FlightListComponent,
        },
        {

          path: 'booking-details', component: BookingDetailsComponent
        },
        {

          path: 'passenger-information/:id', component: PassengerInformationComponent
        },

        {
          path: 'passenger-information', component: PassengerInformationComponent
        },
        {
          path: 'flight-management/flight-management-create', component: FlightCreateComponent
        },
        {
          path: 'flight-management-update', component: FlightEditComponent
        },
        {
          path: 'airline-list', component: AirlineListComponent
        },
        {
          path: 'airline-list/airline-create', component: AirlineCreateComponent
        },
        {
          path: 'customer/change-password',component: CustomerChangePasswordComponent

        }
      ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
