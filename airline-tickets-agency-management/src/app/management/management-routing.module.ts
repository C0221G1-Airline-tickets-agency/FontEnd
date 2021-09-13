import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ReportComponent} from './component/report/report.component';
import {ManagementComponent} from './management/management.component';
import {CustomerComponent} from './component/ business/customer/customer.component';
import {CreateCustomerComponent} from './component/ business/create-customer/create-customer.component';
import {EditCustomerComponent} from './component/ business/edit-customer/edit-customer.component';


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
        },
        {
          path: 'create-customer', component: CreateCustomerComponent
        },
        {
          path: 'edit-customer/:id', component: EditCustomerComponent
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
