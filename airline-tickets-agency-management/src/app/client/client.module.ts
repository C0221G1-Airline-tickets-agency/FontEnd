import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {NewsManipulationComponent} from './component/news/news-manipulation/news-manipulation.component';
import {NewsReviewComponent} from './component/news/news-review/news-review.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ClientComponent} from './client/client.component';
import {CommonClientModule} from '../common/common-client/common-client.module';

import {DestinationDeleteComponent} from './component/destination-delete/destination-delete.component';
import {HomeComponent} from './component/home/home.component';
import {DestinationDetailComponent} from './component/destination-detail/destination-detail.component';
import {ToastrModule} from 'ngx-toastr';


@NgModule({
  declarations: [NewsManipulationComponent, NewsReviewComponent, ClientComponent, DestinationDeleteComponent, HomeComponent,
    DestinationDetailComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    CommonClientModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  bootstrap: [ClientComponent]
})
export class ClientModule {
}
