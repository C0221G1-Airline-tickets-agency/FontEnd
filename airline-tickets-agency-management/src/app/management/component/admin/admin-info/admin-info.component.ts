import {Component, OnInit} from '@angular/core';
import {AdminChangePasswordComponent} from '../admin-change-password/admin-change-password.component';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../../service/user.service';
import {User} from '../../../model/user';


@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.component.html',
  styleUrls: ['./admin-info.component.css']
})
export class AdminInfoComponent implements OnInit {

  constructor(private employeeService: UserService,
              private dialog: MatDialog) {
  }

  admin: User;

  ngOnInit(): void {
    this.getUserById(3);
  }

  getUserById(id: number) {
    this.employeeService.findAdminById(id).subscribe(data => {
      this.admin = data;
      console.log(this.admin.password);
    });
  }

  openDialog(): void {
    const id = this.admin.employee.employeeId;
    const name = this.admin.employee.employeeName;
    const dialogRef = this.dialog.open(AdminChangePasswordComponent, {
      width: '450px', height: 'auto',
      data: {id, name},
    });
  }

}
