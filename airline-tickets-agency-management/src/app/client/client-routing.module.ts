import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsManipulationComponent} from './component/news/news-manipulation/news-manipulation.component';

import {ClientComponent} from './client/client.component';
import {HomeComponent} from './component/home/home.component';
import {FlightListComponent} from './component/flight-ticket/flight-management/flight-list/flight-list.component';
import {BookingDetailsComponent} from './component/flight-ticket/buy-ticket/booking-details/booking-details.component';
import {PassengerInformationComponent} from './component/flight-ticket/buy-ticket/passenger-information/passenger-information.component';
import {FlightCreateComponent} from './component/flight-ticket/flight-management/flight-create/flight-create.component';
import {FlightEditComponent} from './component/flight-ticket/flight-management/flight-edit/flight-edit.component';
import {AirlineListComponent} from './component/flight-ticket/flight-management/airline-list/airline-list.component';
import {AirlineCreateComponent} from './component/flight-ticket/flight-management/airline-create/airline-create.component';


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

        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
