import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {comparePassword} from './comparePassword';
import {PasswordDto} from '../../../model/password-dto';
import {PasswordService} from '../../../service/password/password.service';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-employee-change-password',
  templateUrl: './employee-change-password.component.html',
  styleUrls: ['./employee-change-password.component.css']
})
export class EmployeeChangePasswordComponent implements OnInit {

  constructor(private sv: PasswordService, private toast: ToastrService,
              public dialogRef: MatDialogRef<EmployeeChangePasswordComponent>) {
  }

  password: PasswordDto;
  userId: number;
  isShowPassword1 = false;
  isShowPassword2 = false;
  isShowPassword3 = false;
  passwordForm: FormGroup;

  // message = {
  //   oldPassword: [
  //     {type: 'required', message: 'Trường này không được để trống.'},
  //     {type: 'minlength', message: 'Nhập tối thiểu 5 ký tự.'},
  //     {type: 'pattern', message: 'kí tự chữ a -z không dấu , kí tự số 0-9'},
  //   ],
  //   newPassword: [
  //     {type: 'required', message: 'Trường này không được để trống.'},
  //     {type: 'minlength', message: 'Nhập tối thiểu 5 ký tự.'},
  //     {type: 'pattern', message: 'kí tự chữ a -z không dấu , kí tự số 0-9'},
  //   ],
  //   confirmPassword: [
  //     {type: 'required', message: 'Trường này không được để trống.'},
  //     {type: 'minlength', message: 'Nhập tối thiểu 5 ký tự.'},
  //     {type: 'pattern', message: 'kí tự chữ a -z không dấu , kí tự số 0-9'}
  //   ]
  // };


  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('account')).accountId;
    this.showForm();
  }

  showForm() {
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.minLength(5), Validators.required, Validators.pattern('^\\w{5,}$')]),
      newPassword: new FormControl('', [Validators.minLength(5), Validators.required, Validators.pattern('^\\w{5,}$')]),
      confirmPassword: new FormControl('', [Validators.minLength(5), Validators.required, Validators.pattern('^\\w{5,}$')])
    }, comparePassword);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  updatePassword() {
    this.password = this.passwordForm.value;
    const oldPassword = this.password.oldPassword;
    const newPassword = this.password.newPassword;
    const confirmPassword = this.password.confirmPassword;
    this.checkValidate(oldPassword);
    if (oldPassword === '') {
      this.toast.warning('Chưa nhập mật khẩu', 'Chú ý !');
    } else {
      if (!this.checkValidate(oldPassword)) {
        this.toast.warning('Kí tự chữ a -z không dấu , kí tự số 0-9 , ít nhất 5 kí tự ', 'Chú ý');
      } else {
        if (newPassword === '') {
          this.toast.warning('Chưa nhập mật khẩu mới', 'Chú ý !');
        } else {
          if (!this.checkValidate(newPassword)) {
            this.toast.warning('Kí tự chữ a -z không dấu , kí tự số 0-9 , ít nhất 5 kí tự ', 'Chú ý');
          } else {
            if (confirmPassword === '') {
              this.toast.warning('Chưa nhập lại mật khẩu mới', 'Chú ý');
            } else {
              if (newPassword === confirmPassword) {
                this.sv.sendPassword(this.userId, this.password).subscribe(data => {
                  this.toast.success(data.msg, 'Chú ý !');
                  this.closeDialog();
                }, error => {
                  console.log(error);
                  this.toast.warning(error.error.msg, 'Chú ý !');
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
