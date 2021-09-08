import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
  constructor(private customerService: CustomerService,
              private router: Router,private toast: ToastrService
              ) { };

  validationMessage = {
    customerName: [
      {type: 'required', message: 'Tên không được để trống'},
      {type: 'minlength',message: 'Nhập tối thiểu 6 ký tự'}
    ],
    customerAddress:[
      {type: 'required', message: 'Tên không được để trống'},
    ],
    customerBirthday:[
      {type: 'required', message: 'Tên không được để trống'},
    ],
    customerEmail: [
      {type: 'required', message: 'Trường này không được để trống.'},
      {type: 'minlength', message: 'Nhập tối thiểu 6 ký tự.'}
    ],
    customerPhone: [
      {type: 'required', message: 'Trường này không được để trống.'}
    ],
    customerGender: [
      {type: 'required', message: 'Trường này không được để trống.'}
    ],
    customerPassport: [
      {type: 'required', message: 'Trường này không được để trống.'},
      {type: 'minlength', message: 'Nhập tối thiểu 6 ký tự.'},
      {type: 'maxlength', message: 'Nhập tối đa 50 ký tự.'}
    ],
  }

  ngOnInit(): void {
    this.validate();
  }
  validate(): void {
    this.customerForm = new FormGroup({
        customerName: new FormControl('', [Validators.required, Validators.minLength(6)]),
        customerAddress: new FormControl('',Validators.required),
        customerBirthday: new FormControl('', [Validators.required]),
        customerGender: new FormControl(null,Validators.required),
        customerEmail: new FormControl('',Validators.required),
        customerPhone: new FormControl('', Validators.required),
        customerPassport: new FormControl('',Validators.required)
      }
    );
  }
  createCustomer(){
    this.customer = this.customerForm.value;
    this.customerService.saveCustomer(this.customer).subscribe(()=>{
      this.toast.success("Thêm mới thành công")
      window.location.reload();
    },
      e=>{
      this.toast.error("Các trường * không được để trống,dữ liệu phải đúng định dạng.")
      });
  }

}
