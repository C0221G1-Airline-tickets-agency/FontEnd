import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignupRequest} from '../../user-entity/signupRequest';
import {AuthService} from '../../user-service/auth.service';
import {TokenStorageService} from '../../user-service/token-storage.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  flag = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  formSignin: FormGroup;
  username: string;
  // register
  formRegister: FormGroup;
  signupRequest: SignupRequest;

  validation_messages = {
    'username':[
      {type: 'required',message: 'Email không được để trống!'},
      {type: 'pattern', message: 'Email không đúng định dạng'}
    ],
    'password':[
      {type: 'required',message: 'Mật khẩu không được để trống!'},
      {type:'minLength',message: 'Mật khẩu phải nhiều hơn 8 ký tự!'},
      {type:'maxLength',message: 'Mật khẩu phải ít hơn 20 ký tự!'},
      {type:'pattern',message: 'Mật khẩu phải có ký tự in hoa và số , độ dài từ 8 - 20 ký tự!'},
    ],
    'phone':[
      {type: 'required',message: 'Số điện thoại không được để trống!'},
      {type: 'pattern',message: 'Số điện thoại không đúng định dạng!'}
    ],
    'name':[
      {type: 'required',message: 'Họ và tên không được để trống!'},
      {type:'minLength',message: 'Họ và tên phải nhiều hơn 10 ký tự!'},
      {type:'maxLength',message: 'Họ và tên phải ít hơn 50 ký tự!'}
    ],
    'passport':[
      {type: 'required',message: 'Passport không được để trống!'},
      {type: 'pattern',message: 'Passport phải có 12 chữ số!'}
    ],
  };


  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private toastr: ToastrService) {
    this.formSignin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    if (this.tokenStorage.getToken()) {
      const user = this.tokenStorage.getUser();
      this.roles = this.tokenStorage.getUser().roles;
      this.username = this.tokenStorage.getUser().username;
    }

    this.formRegister = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/), Validators.maxLength(20)]),
      phone: new FormControl('',[Validators.required, Validators.pattern('[- +()0-9]+')]),
      name: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(50)]),
      birthday: new FormControl(),
      address: new FormControl(),
      gender: new FormControl(''),
      nationality: new FormControl(''),
      passport: new FormControl('',[Validators.required, Validators.pattern('^[0-9]{12}$')]),
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    this.authService.login(this.formSignin.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        if (this.tokenStorage.getUser().enabled == false) {
          this.tokenStorage.signOut();
          this.toastr.error('Tài khoản chưa được xác thực. Xin kiểm tra email', 'Đăng nhập', {
            timeOut: 2000,
              extendedTimeOut: 1500
          });
        } else {
          this.toastr.success('Đăng nhập thành công', 'Đăng nhập ', {
            timeOut: 2000,
            extendedTimeOut: 1500
          });
          this.reloadPage();
        }
      },
      err => {
        this.toastr.error('Sai tên tài khoản hoặc mật khẩu.Vui lòng đăng nhập lại', 'Đăng nhập ', {
          timeOut: 2000,
          extendedTimeOut: 1500
        });
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(this.formSignin.value);
      }
    );
  }

  onSubmitRegister() {
    this.signupRequest = this.formRegister.value;

    this.authService.register(this.signupRequest).subscribe(() => {
        this.toastr.success('Đăng ký thành công. Vui lòng xác thực tại email.', 'Đăng ký ', {
          timeOut: 2000,
          extendedTimeOut: 1500
        });
        this.authService.sendEmail(this.signupRequest.username).subscribe(() => {
          console.log("Đã gởi mail!")
        });
      },
      err => {    console.log(err);

        this.toastr.error('Các trường dữ liệu phải đúng format', 'Đăng ký ', {
          timeOut: 2000,
          extendedTimeOut: 1500
        });

      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  openRegister() {
    if (this.flag === true) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  }

}
