import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeService} from '../../../service/employee/employee.service';
import {Employee} from '../../../model/employee';
import {EmployeeChangePasswordComponent} from '../employee-change-password/employee-change-password.component';
import {TokenStorageService} from "../../../user/user-service/token-storage.service";


@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: ['./employee-information.component.css']
})
export class EmployeeInformationComponent implements OnInit {
  empl: Employee;
  id: number;
  name: string;
  code: string;
  birthday: string;
  address: string;
  phone: string;
  email: string;
  image: string;
  account = {
    email: 'haudepgai@gmail.com',
    accountId: 1
  };

  constructor(private dialog: MatDialog, private sv: EmployeeService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    // Tạo localStorage data
    // localStorage.setItem('account', JSON.stringify(this.account));
    // Lấy data từ localStorage
    this.getEmployees();
  }

  getEmployees() {
    this.empl = this.tokenStorageService.getUser().employee;
    {
      this.id = this.empl.employeeId;
      this.name = this.empl.employeeName;
      this.code = this.empl.employeeCode;
      this.birthday = this.empl.employeeBirthday;
      this.address = this.empl.employeeAddress;
      this.phone = this.empl.employeePhoneNumber;
      this.image = this.empl.employeeImage;
      this.email = this.tokenStorageService.getUser().username;
    }
  };

  openDialogChangePassword() {
    this.dialog.open(EmployeeChangePasswordComponent);
  }
}
