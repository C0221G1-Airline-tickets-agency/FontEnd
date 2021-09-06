import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { NewsManipulationComponent } from './component/news/news-manipulation/news-manipulation.component';
import { NewsReviewComponent } from './component/news/news-review/news-review.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ClientComponent} from './client/client.component';
import {CommonClientModule} from '../common/common-client/common-client.module';
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



@NgModule({
  declarations: [NewsManipulationComponent, NewsReviewComponent, ClientComponent, FeedComponent, ChatFormComponent, ChatRoomComponent, InboxBoxComponent, MessageComponent, SignupComponent, ListRoomComponent, ManageChatRoomComponent, ManageChatFormComponent, ManageFeedComponent, ManageMessageComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    CommonClientModule,
    FormsModule,

  ],
  exports: [
    InboxBoxComponent
  ],
  bootstrap: [ClientComponent]
})
export class ClientModule { }
