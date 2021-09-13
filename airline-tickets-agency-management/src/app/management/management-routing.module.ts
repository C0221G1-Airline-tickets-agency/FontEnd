import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ReportComponent} from './component/report/report.component';
import {ManagementComponent} from './management/management.component';
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
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {
}
