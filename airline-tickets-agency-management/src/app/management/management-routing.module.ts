import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ReportComponent} from './component/report/report.component';
import {ManagementComponent} from './management/management.component';
import {CustomerComponent} from './component/customer/customer.component';


const routes: Routes = [
  {
    path: '', component: ManagementComponent,
    children:
      [
        {
          path: 'report', component: ReportComponent
        },
        {
          path: 'customer', component: CustomerComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {
}
