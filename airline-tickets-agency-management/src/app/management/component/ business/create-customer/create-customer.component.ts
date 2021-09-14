import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Customer} from '../../../../model/customer/customer';
import {CustomerService} from '../../../../service/customer/customer.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
// import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer: Customer;
  msgEmail = "";
  msgPassport = "";

  constructor(private customerService: CustomerService,
              private router: Router,private toast: ToastrService
              ) { };

  validationMessage = {
    customerName: [
      {type: 'required', message: 'Tên không được để trống!'},
      {type: 'minlength',message: 'Tên ít nhất 6 ký tự.'},
      {type: 'maxlength', message: 'Tên tối đa 20 ký tự'},
    ],
    customerAddress:[
      {type: 'required', message: 'Địa chỉ không được để trống!'},
    ],
    customerBirthday:[
      {type: 'required', message: 'Ngày sinh không được để trống!'},
      {type: 'validAge', message: 'Tuổi phải trên 18.'}
    ],
    customerEmail: [
      {type: 'required', message: 'Email không được để trống!'},
      {type: 'email', message: 'Vui lòng nhập đúng định dạng.'}
    ],
    customerPhone: [
      {type: 'required', message: 'Số điện thoại không được để trống!'},
      {type: 'pattern', message: 'Vui lòng nhập 10 chữ số!'}
    ],
    customerGender: [
      {type: 'required', message: 'Vui lòng chọn giới tính!'}
    ],
    customerPassport: [
      {type: 'required', message: 'Passport không được để trống!'},
      {type: 'pattern',message: 'Vui lòng nhập 9 hoặc 12 chữ số'}
    ],
  }

  ngOnInit(): void {
    this.validate();
  }
  validate(): void {
    this.customerForm = new FormGroup({
        customerName: new FormControl('', [Validators.required, Validators.minLength(6),Validators.maxLength(20)]),
        customerAddress: new FormControl('',Validators.required),
        customerBirthday: new FormControl('', [Validators.required,this.validAge]),
        customerGender: new FormControl(null,Validators.required),
        customerEmail: new FormControl('',[Validators.required,Validators.email]),
        customerPhone: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
        customerPassport: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]{9}$|^[0-9]{12}$/)])
      }
    );
  }
  createCustomer(){
    this.customer = this.customerForm.value;
    this.customerService.saveCustomer(this.customer).subscribe(data=>{
        console.log(data);
        // @ts-ignore
        if(data.status == false){
          // @ts-ignore
          this.msgEmail = data.msgEmail;
          // @ts-ignore
          this.msgPassport = data.msgPassport;
          this.toast.error("Vui lòng kiểm tra lại dữ liệu nhập vào!!!Các trường * không được để trống hoặc chưa đúng định dạng!!!","Thông báo");
        }else {
          this.toast.success("Tạo mới thành công","Thông báo");
          this.router.navigateByUrl("/management/customer")
        }

    },
      e=>{
      this.toast.error("Các trường * không được để trống,dữ liệu phải đúng định dạng.","Thông báo");
      });
  }

  validAge(control: AbstractControl) {
    const date = control.value;
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      return {'validAge': true};
    } else {
      return null;
    }
  }


}
