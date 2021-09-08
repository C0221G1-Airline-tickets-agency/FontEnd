import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {NewsManipulationComponent} from './component/news/news-manipulation/news-manipulation.component';
import {NewsReviewComponent} from './component/news/news-review/news-review.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

import {ClientComponent} from './client/client.component';
import {CommonClientModule} from '../common/common-client/common-client.module';

import {NewsListComponent} from './component/news/news-list/news-list.component';
import {NewsDetailsComponent} from './component/news/news-details/news-details.component';

import {TruncatePipe} from './component/news/news-list/TruncatePipe';
import {NewsDeleteComponent} from './component/news/news-delete/news-delete.component';
import {AdminAuthService} from '../service/auth/admin-auth.service';


@NgModule({
  declarations: [NewsManipulationComponent, NewsReviewComponent, ClientComponent, NewsListComponent,
    NewsDetailsComponent, TruncatePipe, NewsDeleteComponent],

  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    CommonClientModule
  ],
  bootstrap: [ClientComponent]

})
export class ClientModule {
}
