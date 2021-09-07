import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { NewsManipulationComponent } from './component/news/news-manipulation/news-manipulation.component';
import { NewsReviewComponent } from './component/news/news-review/news-review.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

import {ClientComponent} from './client/client.component';
import {CommonClientModule} from '../common/common-client/common-client.module';
import { DestinationCreateComponent } from './component/destination/destination-create/destination-create.component';
import { DestinationUpdateComponent } from './component/destination/destination-update/destination-update.component';
import { ScenicCreateComponent } from './component/destination/scenic-create/scenic-create.component';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [NewsManipulationComponent, NewsReviewComponent, ClientComponent, DestinationCreateComponent, DestinationUpdateComponent, ScenicCreateComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    CommonClientModule,
    MatDialogModule
  ],
  bootstrap: [ClientComponent]
})
export class ClientModule { }
