import { Component, OnInit } from '@angular/core';
import {Password} from '../../../../model/password';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from "../../../../model/user";
import {CustomerService} from "../../../../service/customer/customer.service";
import {comparePassword} from "./comparePassword";
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from "../../../../user/user-service/token-storage.service";


@Component({
  selector: 'app-customer-change-password',
  templateUrl: './customer-change-password.component.html',
  styleUrls: ['./customer-change-password.component.css']
})
export class CustomerChangePasswordComponent implements OnInit {
  customer: User;
  password: Password;
  id: number;

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,20}$')]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,20}$')]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,20}$')])
  }, comparePassword);
  constructor(private customerService: CustomerService,
              private toast: ToastrService,
              private tokenService: TokenStorageService) {
  }
  ngOnInit(): void {
    this.id = this.tokenService.getUser().id;
    this.getPasswordAdmin(this.id);
  }
  getPasswordAdmin(id: number) {
    this.customerService.findCustomerById(id).subscribe(data => {
      this.customer = data;
    });
  }
  changePassword() {
    this.password = this.passwordForm.value;
    const oldPassword = this.password.oldPassword;
    const newPassword = this.password.newPassword;
    const confirmPassword = this.password.confirmPassword;
    this.checkValidate(oldPassword);
    if (oldPassword === '') {
      this.toast.warning('Chưa nhập mật khẩu', 'Chú ý !');
    } else {
      if (!this.checkValidate(oldPassword)) {
        this.toast.warning('Mật khẩu phải từ 8-20 ký tự bao gồm ký tự viết hoa và số ', 'Chú ý');
      } else {
        if (newPassword === '') {
          this.toast.warning('Chưa nhập mật khẩu mới', 'Chú ý !');
        } else {
          if (!this.checkValidate(newPassword)) {
            this.toast.warning('Mật khẩu phải từ 8-20 ký tự bao gồm ký tự viết hoa và số ', 'Chú ý');
          } else {
            if (confirmPassword === '') {
              this.toast.warning('Chưa nhập lại mật khẩu mới', 'Chú ý');
            } else {
              if (newPassword === confirmPassword) {
                this.customerService.updatePassword(this.id, this.password).subscribe(data => {
                  this.toast.success(data.msg, 'Chú ý !');
                  console.log(data);

                  window.location.href = 'http://localhost:4200/';

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
    const check = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    return check.test(a);
  }
}
