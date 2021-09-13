import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsManipulationComponent} from './component/news/news-manipulation/news-manipulation.component';

import {ClientComponent} from './client/client.component';
import {HomeComponent} from './component/home/home.component';
import {DestinationDetailComponent} from './component/destination-detail/destination-detail.component';

import {TestComponent} from './component/test/test.component';

import {NewsListComponent} from './component/news/news-list/news-list.component';
import {NewsDetailsComponent} from './component/news/news-details/news-details.component';

import {AdminAuthService} from '../service/auth/admin-auth.service';
import {DestinationCreateComponent} from './component/destination/destination-create/destination-create.component';
import {DestinationUpdateComponent} from './component/destination/destination-update/destination-update.component';
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

          path: 'news/news-list', component: NewsListComponent
        },
        {
          path: 'news/news-details/:id', component: NewsDetailsComponent
        },
        {
          path: 'news/manipulation', component: NewsManipulationComponent, canActivate: [AdminAuthService]
        },
        {
          path: 'news/manipulation/:id', component: NewsManipulationComponent, canActivate: [AdminAuthService]
        },
        {
          path: 'destination/detail/:id', component: DestinationDetailComponent
        },
        {
          path: 'destination/create-destination', component: DestinationCreateComponent
        },
        {
          path: 'destination/edit-destination/:id', component: DestinationUpdateComponent
        },
        {path:'roomAdmin',component:ManageChatRoomComponent},
      ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
