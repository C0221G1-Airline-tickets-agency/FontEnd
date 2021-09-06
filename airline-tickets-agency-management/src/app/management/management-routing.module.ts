import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ReportComponent} from './component/report/report.component';
import {HomeComponent} from './component/home/home.component';
import {AdminInfoComponent} from './component/admin/admin-info/admin-info.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'report', component: ReportComponent
  },
  {
    path: 'admin', component: AdminInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {
}
