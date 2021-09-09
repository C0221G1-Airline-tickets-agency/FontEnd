import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsManipulationComponent} from './component/news/news-manipulation/news-manipulation.component';

import {ClientComponent} from './client/client.component';
import {HomeComponent} from './component/home/home.component';
import {FlightListComponent} from './component/flight-ticket/flight-management/flight-list/flight-list.component';
import { BookingDetailsComponent } from './component/flight-ticket/buy-ticket/booking-details/booking-details.component';
import { PassengerInformationComponent } from './component/flight-ticket/buy-ticket/passenger-information/passenger-information.component';



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
          path: 'flight-management', component: FlightListComponent,
        },
        {

          path: 'booking-details', component: BookingDetailsComponent
        },
        {
          path: 'passenger-information/:id', component: PassengerInformationComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
