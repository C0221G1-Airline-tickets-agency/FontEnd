import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../../service/customer/customer.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../../../model/customer/customer';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer: Customer;
  idCustomer: any;
  msgEmail = "";
  msgPassport = "";
  msgDate = "";
  constructor(private customerService: CustomerService,
              private activatedRoute: ActivatedRoute,
              private toast: ToastrService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap:ParamMap)=>{
      this.idCustomer = paramMap.get('id');
    });
    this.customerService.findById(this.idCustomer).subscribe(data =>{
      this.customer = data;
      // this.customerForm.patchValue(this.customer);
      // console.log(this.customerForm);
      this.customerForm = new FormGroup({
          customerId: new FormControl(this.customer.customerId),
          customerCode: new FormControl(this.customer.customerCode),
          customerName: new FormControl(this.customer.customerName, [Validators.required, Validators.minLength(6),Validators.maxLength(20)]),
          customerAddress: new FormControl(this.customer.customerAddress,Validators.required),
          customerBirthday: new FormControl(this.customer.customerBirthday, [Validators.required,,this.validAge]),
          customerGender: new FormControl(this.customer.customerGender,Validators.required),
          customerEmail: new FormControl(this.customer.customerEmail,[Validators.required,Validators.email]),
          customerPhone: new FormControl(this.customer.customerPhone, [Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
          customerPassport: new FormControl(this.customer.customerPassport,[Validators.required,Validators.pattern(/^[0-9]{9}$|^[0-9]{12}$/)])
        }
      );
    });


  }

  validationMessage = {
    customerName: [
      {type: 'required', message: 'Tên không được để trống'},
      {type: 'minlength',message: 'Tên tối thiểu 6 ký tự'},
      {type: 'maxlength',message: 'Tên tối đa 20 ký tự'}
    ],
    customerAddress:[
      {type: 'required', message: 'Địa chỉ không được để trống'},
    ],
    customerBirthday:[
      {type: 'required', message: 'Ngày sinh không được để trống'},
      {type: 'validAge', message: 'Tuổi phải lớn hơn 18'}
    ],
    customerEmail: [
      {type: 'required', message: 'Email không được để trống.'},
      {type: 'email', message: 'Vui lòng nhập đúng định dạng.'}
    ],
    customerPhone: [
      {type: 'required', message: 'Điện thoại không được để trống.'},
      {type: 'pattern', message: 'Vui lòng nhập 10 chữ số'}
    ],
    customerGender: [
      {type: 'required', message: 'Vui lòng chọn giới tính.'}
    ],
    customerPassport: [
      {type: 'required', message: 'Passport không được để trống.'},
      {type: 'pattern',message: 'Vui lòng nhập 9 hoặc 12 chữ số'}
    ],
  }

  ngOnInit(): void {

  }
  validate(): void {


  };

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  };


  editCustomer(){
    this.customer = this.customerForm.value;
    this.customerService.updateCustomer(this.idCustomer,this.customer).subscribe(data=>{
        console.log(data);
        // @ts-ignore
        if(data.status == false){
          // @ts-ignore
          this.msgEmail = data.msgEmail;
          // @ts-ignore
          this.msgPassport = data.msgPassport;
          // @ts-ignore
          this.msgDate = data.msgDate;
          this.toast.error("Vui lòng kiểm tra lại dữ liệu nhập vào!!!Các trường * không được để trống hoặc chưa đúng định dạng!!!","Thông báo");
        }else {
          this.toast.success("Sửa thành công","Thông báo");
          this.router.navigateByUrl("/management/customer")
        }
    },
      error => {
     this.toast.error("Các trường phải đúng định dạng.","Thông báo")
      })
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
