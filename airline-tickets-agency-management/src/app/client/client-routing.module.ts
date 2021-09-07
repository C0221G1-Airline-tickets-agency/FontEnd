import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsManipulationComponent} from './component/news/news-manipulation/news-manipulation.component';
import {ManagementComponent} from '../management/management/management.component';
import {ReportComponent} from '../management/component/report/report.component';
import {ClientComponent} from './client/client.component';
import {HomeComponent} from './component/home/home.component';
import {TestComponent} from './component/test/test.component';


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
        {
          path: 'test', component: TestComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
