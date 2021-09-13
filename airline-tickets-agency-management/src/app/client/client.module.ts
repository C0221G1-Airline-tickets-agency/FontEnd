import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
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
    ManageMessageComponent],
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
