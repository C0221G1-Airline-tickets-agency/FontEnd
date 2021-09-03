import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ReportComponent} from './component/report/report.component';
import {HomeComponent} from './component/home/home.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'report', component: ReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {
}
