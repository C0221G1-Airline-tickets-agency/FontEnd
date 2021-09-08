import {Component, OnInit} from '@angular/core';
import {AdminChangePasswordComponent} from '../admin-change-password/admin-change-password.component';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../../service/user.service';
import {User} from '../../../model/user';
import {Role} from '../../../model/role';


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
  roles: Role[];
  isAdmin = false;

  ngOnInit(): void {
    this.getAdminById(3);
  }

  getAdminById(id: number) {
    this.employeeService.findAdminById(id).subscribe(data => {
      this.admin = data;
      console.log(this.admin.password);
      this.checkRole(data);
    });
  }

  checkRole(user: User) {
    this.roles = user.roles;
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].name === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    }
    console.log(this.isAdmin);
    console.log(this.roles);
  }

  openDialog(): void {
    const id = this.admin.employee.employeeId;
    const name = this.admin.employee.employeeName;
    const dialogRef = this.dialog.open(AdminChangePasswordComponent, {
      width: 'auto', height: 'auto',
      data: {id, name},
    });
  }

}
