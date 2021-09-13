import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsManipulationComponent} from './component/news/news-manipulation/news-manipulation.component';
import {ManagementComponent} from '../management/management/management.component';
import {ReportComponent} from '../management/component/report/report.component';
import {ClientComponent} from './client/client.component';
import {HomeComponent} from './component/home/home.component';

import {NewsListComponent} from './component/news/news-list/news-list.component';
import {NewsDetailsComponent} from './component/news/news-details/news-details.component';

import {AdminAuthService} from '../service/auth/admin-auth.service';


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
