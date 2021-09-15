import {Component, OnInit} from '@angular/core';
import {AdminChangePasswordComponent} from '../admin-change-password/admin-change-password.component';
import {MatDialog} from '@angular/material/dialog';

import {Employee} from "../../../../model/employee";
import {EmployeeService} from "../../../../service/employee/employee.service";
import {TokenStorageService} from "../../../../user/user-service/token-storage.service";

import {Role} from "../../../../model/role";
import {UserService} from "../../../../service/user/user.service";
import {User} from "../../../../model/user";


@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.component.html',
  styleUrls: ['./admin-info.component.css']
})
export class AdminInfoComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
              private dialog: MatDialog,
              private tokenStorageService: TokenStorageService,
              private userService: UserService) {
  }

  admin: Employee;
  checkAdmin = false;
  userId: number;
  user: User;
  userEmail : string;

  ngOnInit(): void {
    this.getIdUserByTokenStorageService();
    this.getUserById(this.userId);
    this.getAdminByTokenStorageService();
    this.getEmailUserByTokenStorageService()
  }

  getIdUserByTokenStorageService() {
    this.userId = this.tokenStorageService.getUser().id;
  }

  getUserById(id: number) {
    this.userService.findById(id).subscribe(data => {
      this.user = data;
      this.checkRole();
    })
  }
  getAdminByTokenStorageService() {
    this.admin = this.tokenStorageService.getUser().employee;
  }

  checkRole() {
    for (let i = 0; i < this.user.roles.length; i++) {
      if(this.user.roles[i].name === 'ROLE_ADMIN'){
        this.checkAdmin=true;
      }
    }
  }
  getEmailUserByTokenStorageService(){
    this.userEmail = this.tokenStorageService.getUser().username;
  }

  openDialog(): void {
    const id = this.tokenStorageService.getUser().id;
    const name = this.tokenStorageService.getUser().employee.employeeName;
    console.log(id);
    const dialogRef = this.dialog.open(AdminChangePasswordComponent, {
      width: 'auto', height: 'auto',
      data: {id, name},
    });
  }
}
