import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { FlightListComponent } from './component/flight-ticket/buy-ticket/flight-list/flight-list.component';


import {ClientRoutingModule} from './client-routing.module';
import {NewsManipulationComponent} from './component/news/news-manipulation/news-manipulation.component';
import {NewsReviewComponent} from './component/news/news-review/news-review.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClientComponent} from './client/client.component';
import {CommonClientModule} from '../common/common-client/common-client.module';
import {NewsListComponent} from './component/news/news-list/news-list.component';
import {NewsDetailsComponent} from './component/news/news-details/news-details.component';
import {DestinationCreateComponent} from './component/destination/destination-create/destination-create.component';
import {DestinationUpdateComponent} from './component/destination/destination-update/destination-update.component';
import {ScenicCreateComponent} from './component/destination/scenic-create/scenic-create.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ScenicEditComponent} from './component/destination/scenic-edit/scenic-edit.component';
import {DialogConfirmComponent} from './component/destination/dialog-confirm/dialog-confirm.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {FeedComponent} from './component/inbox/feed/feed.component';
import {ChatFormComponent} from "./component/inbox/chat-form/chat-form.component";
import {ChatRoomComponent} from "./component/inbox/chat-room/chat-room.component";
import {InboxBoxComponent} from "./component/inbox/inbox-box/inbox-box.component";
import {MessageComponent} from "./component/inbox/message/message.component";
import {SignupComponent} from "./component/inbox/signup/signup.component";
import {ListRoomComponent} from "./component/adminInbox/list-room/list-room.component";
import {ManageChatRoomComponent} from "./component/adminInbox/manage-chat-room/manage-chat-room.component";
import {ManageChatFormComponent} from "./component/adminInbox/manage-chat-form/manage-chat-form.component";
import {ManageFeedComponent} from "./component/adminInbox/manage-feed/manage-feed.component";
import {ManageMessageComponent} from "./component/adminInbox/manage-message/manage-message.component";
import {TruncatePipe} from './component/news/news-list/TruncatePipe';
import {NewsDeleteComponent} from './component/news/news-delete/news-delete.component';
import {AdminAuthService} from '../service/auth/admin-auth.service';
import {DestinationDeleteComponent} from './component/destination-delete/destination-delete.component';
import {HomeComponent} from './component/home/home.component';
import {DestinationDetailComponent} from './component/destination-detail/destination-detail.component';
import {ToastrModule} from 'ngx-toastr';
import { CustomerPaymentComponent } from './component/customer/customer-payment/customer-payment.component';
import { CustomerTransactionHistoryComponent } from './component/customer/customer-transaction-history/customer-transaction-history.component';
import { BookingDetailsComponent } from './component/flight-ticket/buy-ticket/booking-details/booking-details.component';
import { PassengerInformationComponent } from './component/flight-ticket/buy-ticket/passenger-information/passenger-information.component';
import { FlightListComponent } from './component/flight-ticket/flight-management/flight-list/flight-list.component';
import { DialogDeleteComponent } from './component/flight-ticket/flight-management/dialog-delete/dialog-delete.component';
import { DialogReturnComponent } from './component/flight-ticket/flight-management/dialog-return/dialog-return.component';


import {CustomCurrencyPipe} from './component/flight-ticket/flight-management/custom-currency.pipe';
import {AirlineCreateComponent} from "./component/flight-ticket/flight-management/airline-create/airline-create.component";
import {AirlineListComponent} from "./component/flight-ticket/flight-management/airline-list/airline-list.component";
import {FlightCreateComponent} from "./component/flight-ticket/flight-management/flight-create/flight-create.component";
import {FlightEditComponent} from "./component/flight-ticket/flight-management/flight-edit/flight-edit.component";

import { CustomerChangePasswordComponent } from './component/customer/customer-change-password/customer-change-password.component';

@NgModule({

  declarations: [NewsListComponent,
    NewsDetailsComponent, TruncatePipe, NewsDeleteComponent,
    NewsManipulationComponent, NewsReviewComponent, ClientComponent,
    DestinationDeleteComponent, HomeComponent,
    DestinationDetailComponent, DestinationCreateComponent,
    DestinationUpdateComponent, ScenicCreateComponent,
    ScenicEditComponent, DialogConfirmComponent,
    FeedComponent, ChatFormComponent, ChatRoomComponent,
    InboxBoxComponent, MessageComponent, SignupComponent,
    ListRoomComponent, ManageChatRoomComponent,
    ManageChatFormComponent, ManageFeedComponent,
    ManageMessageComponent,
    FlightListComponent,AirlineCreateComponent,AirlineListComponent,
    FlightEditComponent,FlightCreateComponent, DialogDeleteComponent, BookingDetailsComponent,
    PassengerInformationComponent, DialogReturnComponent,CustomCurrencyPipe,
    CustomerTransactionHistoryComponent,CustomerPaymentComponent, CustomerChangePasswordComponent, FlightListComponent],

  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    CommonClientModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    LazyLoadImageModule

  ],
  exports: [
    InboxBoxComponent
  ],

  bootstrap: [ClientComponent]
})
export class ClientModule {
}
