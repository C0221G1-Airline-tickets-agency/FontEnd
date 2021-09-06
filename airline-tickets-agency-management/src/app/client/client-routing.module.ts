import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsManipulationComponent} from './component/news/news-manipulation/news-manipulation.component';

import {ClientComponent} from './client/client.component';
import {HomeComponent} from './component/home/home.component';
import {ManageChatRoomComponent} from "./component/adminInbox/manage-chat-room/manage-chat-room.component";


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
        {path:'roomAdmin',component:ManageChatRoomComponent},
      ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
