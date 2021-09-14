import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ReportComponent} from './component/report/report.component';
import {ManagementComponent} from './management/management.component';

import {CustomerComponent} from './component/ business/customer/customer.component';
import {CreateCustomerComponent} from './component/ business/create-customer/create-customer.component';
import {EditCustomerComponent} from './component/ business/edit-customer/edit-customer.component';
import {TicketListComponent} from "./component/management-ticket/ticket-list/ticket-list.component";
import {StatisticalComponent} from './component/statistical/statistical.component';
import {EmployeeComponent} from './component/employee/list-delete-employee/employee.component';
import {AddEmployeeComponent} from './component/employee/add-employee/add-employee.component';
import {UpdateEmployeeComponent} from './component/employee/update-employee/update-employee.component';
import {EmployeeInformationComponent} from './component/employee-information/employee-information.component';



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
        },
        {
          path: 'ticket/list', component: TicketListComponent
        },
        {
          path: 'statistical', component: StatisticalComponent
        },
        {
          path: 'employee', component: EmployeeComponent
        },
        {
          path: 'employee/create', component: AddEmployeeComponent
        },
        {
          path: 'employee/update/:id', component: UpdateEmployeeComponent
        },
        {
          path: 'employee-information', component: EmployeeInformationComponent
        },
        {
          path: 'employee-add', component: AddEmployeeComponent
        }
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {
}
