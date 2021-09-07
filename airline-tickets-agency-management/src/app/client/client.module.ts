import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { NewsManipulationComponent } from './component/news/news-manipulation/news-manipulation.component';
import { NewsReviewComponent } from './component/news/news-review/news-review.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

import {ClientComponent} from './client/client.component';
import {CommonClientModule} from '../common/common-client/common-client.module';
import { HomeComponent } from './component/home/home/home.component';
import { DestinationDeleteComponent } from './component/home/destination-delete/destination-delete.component';




@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [NewsManipulationComponent, NewsReviewComponent, ClientComponent , HomeComponent, DestinationDeleteComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    CommonClientModule
  ],
  bootstrap: [ClientComponent]
})
export class ClientModule { }
