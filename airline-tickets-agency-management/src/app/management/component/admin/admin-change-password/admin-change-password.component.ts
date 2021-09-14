import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Password} from '../../../model/password';
import {comparePassword} from './validation/compare-password';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../../service/user.service';
import {User} from '../../../model/user';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})
export class AdminChangePasswordComponent implements OnInit {
  admin: User;
  password: Password;
  id: number;

  checkPassForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.pattern('^\\w{5,}$')]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern('^\\w{5,}$')]),
    confirmNewPassword: new FormControl('')
  }, comparePassword);

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<AdminChangePasswordComponent>,
              private employeeService: UserService, private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getPasswordAdmin(this.data.id);
    this.id = this.data.id;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getPasswordAdmin(id: number) {
    this.employeeService.findAdminById(id).subscribe(data => {
      this.admin = data;
    });
  }

  changePassword() {
    this.password = this.checkPassForm.value;
    const oldPassword = this.password.oldPassword;
    const newPassword = this.password.newPassword;
    const confirmPassword = this.password.confirmNewPassword;
    console.log('old password = ' + oldPassword);
    console.log('new password = ' + newPassword);
    console.log('confirm  new password = ' + newPassword);
    this.checkValidate(oldPassword);
    if (oldPassword === '') {
      this.toast.warning('Chưa nhập mật khẩu', 'Chú ý !');
    } else {
      if (!this.checkValidate(oldPassword)) {
        this.toast.warning('Mật khẩu là kí tự chữ a -z không dấu , kí tự số 0-9 , ít nhất 5 kí tự ', 'Chú ý');
      } else {
        if (newPassword === '') {
          this.toast.warning('Chưa nhập mật khẩu mới', 'Chú ý !');
        } else {
          if (!this.checkValidate(newPassword)) {
            this.toast.warning('Mật khẩu là kí tự chữ a -z không dấu , kí tự số 0-9 , ít nhất 5 kí tự ', 'Chú ý');
          } else {
            if (confirmPassword === '') {
              this.toast.warning('Chưa nhập lại mật khẩu mới', 'Chú ý');
            } else {
              if (newPassword === confirmPassword) {
                this.employeeService.updatePassword(this.id, this.password).subscribe(data => {
                  this.closeDialog();
                  this.toast.success(data.msg, 'Chú ý !');
                  console.log(data);
                }, error => {
                  this.toast.warning(error.error.msg, 'Chú ý !');
                  console.log(error);
                });
              } else {
                this.toast.warning('Mật khẩu không trùng khớp', 'Chú ý');
              }
            }
          }
        }
      }
    }
  }
  checkValidate(a: string) {
    const check = /^\w{5,}$/;
    return check.test(a);
  }
}
