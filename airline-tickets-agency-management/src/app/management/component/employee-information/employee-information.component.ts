import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeChangePasswordComponent} from '../employee-change-password/employee-change-password.component';
import {Employee} from '../../../model/employee';

@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: ['./employee-information.component.css']
})
export class EmployeeInformationComponent implements OnInit {
  employee: Employee;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openFormChangePassword() {
    this.dialog.open(EmployeeChangePasswordComponent, {
      data: this.employee
    });
  }
}
