import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../../service/customer/customer.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
  constructor(private customerService: CustomerService,
              private activatedRoute: ActivatedRoute,
              private toast: ToastrService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap:ParamMap)=>{
      this.idCustomer = paramMap.get('id');
      console.log(this.idCustomer);
    });
    this.customerService.findById(this.idCustomer).subscribe(data =>{
      this.customer = data;
      // this.customerForm.patchValue(this.customer);
      // console.log(this.customerForm);
      this.customerForm = new FormGroup({
          customerId: new FormControl(this.customer.customerId),
          customerCode: new FormControl(this.customer.customerCode),
          customerName: new FormControl(this.customer.customerName, [Validators.required, Validators.minLength(6)]),
          customerAddress: new FormControl(this.customer.customerAddress,Validators.required),
          customerBirthday: new FormControl(this.customer.customerBirthday, [Validators.required]),
          customerGender: new FormControl(this.customer.customerGender,Validators.required),
          customerEmail: new FormControl(this.customer.customerEmail,[Validators.required,Validators.email]),
          customerPhone: new FormControl(this.customer.customerPhone, [Validators.required,Validators.pattern('^[0-9]{10}$')]),
          customerPassport: new FormControl(this.customer.customerPassport,[Validators.required,Validators.pattern('^[0-9]{9}$')])
        }
      );
    });


  }

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
      {type: 'email', message: 'Vui lòng nhập đúng định dạng.'}
    ],
    customerPhone: [
      {type: 'required', message: 'Trường này không được để trống.'},
      {type: 'pattern', message: 'Vui lòng nhập 10 chữ số'}
    ],
    customerGender: [
      {type: 'required', message: 'Trường này không được để trống.'}
    ],
    customerPassport: [
      {type: 'required', message: 'Trường này không được để trống.'},
      {type: 'pattern',message: 'Vui lòng nhập 9 chữ số'}
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
    this.customerService.updateCustomer(this.idCustomer,this.customer).subscribe(()=>{
      this.toast.success("Sửa hoàn tất!!!");
      this.router.navigateByUrl("/management/customer");
    },
      error => {
     this.toast.error("Các trường phải đúng định dạng.")
      })
  }
}
