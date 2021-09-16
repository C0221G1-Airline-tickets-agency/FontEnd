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
import {AdminAuthService} from "../service/auth/admin-auth.service";
import {AdminInfoComponent} from "./component/admin/admin-info/admin-info.component";
import {AuthGuard} from "../service/auth/auth.guard.service";
import {ModeratorAuthService} from "../service/auth/moderator-auth.service";



const routes: Routes = [
  {
    path: '', component: ManagementComponent,
    children:
      [
        {
          path: 'admin', component: AdminInfoComponent, canActivate: [AdminAuthService]
        },
        {
          path: 'report', component: ReportComponent, canActivate: [AdminAuthService]
        },
        {
          path: 'customer', component: CustomerComponent, canActivate: [ModeratorAuthService]
        },
        {
          path: 'create-customer', component: CreateCustomerComponent, canActivate: [ModeratorAuthService]
        },
        {
          path: 'edit-customer/:id', component: EditCustomerComponent, canActivate: [ModeratorAuthService]
        },
        {
          path: 'ticket/list', component: TicketListComponent, canActivate: [ModeratorAuthService]
        },
        {
          path: 'statistical', component: StatisticalComponent, canActivate: [AdminAuthService]
        },
        {
          path: 'employee', component: EmployeeComponent, canActivate: [AdminAuthService]
        },
        {
          path: 'employee/create', component: AddEmployeeComponent, canActivate: [AdminAuthService]
        },
        {
          path: 'employee/update/:id', component: UpdateEmployeeComponent, canActivate: [AdminAuthService]
        },
        {
          path: 'employee-information', component: EmployeeInformationComponent, canActivate: [ModeratorAuthService]
        },
        {
          path: 'employee-add', component: AddEmployeeComponent, canActivate: [AdminAuthService]
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
