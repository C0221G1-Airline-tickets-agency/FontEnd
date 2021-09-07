import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeService} from '../../../service/employee/employee.service';
import {Employee} from '../../../model/employee';


@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: ['./employee-information.component.css']
})
export class EmployeeInformationComponent implements OnInit {
  employee: Employee;
  employeeId: number;
  id: number;
  name: string;
  code: string;
  birthday: string;
  address: string;
  phone: string;
  startDate: string;
  account = {
    email: 'haudepgai@gmail.com',
    accountId: 1
  };

  constructor(private dialog: MatDialog, private sv: EmployeeService) {
  }

  ngOnInit(): void {
    localStorage.setItem('account', JSON.stringify(this.account));
    this.employeeId = JSON.parse(localStorage.getItem('account')).accountId;
    this.getEmployees();
  }

  getEmployees() {
    this.sv.findById(this.employeeId).subscribe(e => {
      this.id = e.employeeId;
      this.name = e.employeeName;
      this.code = e.employeeCode;
      this.birthday = e.employeeBirthday;
      this.address = e.employeeAddress;
      this.phone = e.employeePhone;
      this.startDate = e.employeeStartDate;
      console.log(this.id);
    });
  }
}
