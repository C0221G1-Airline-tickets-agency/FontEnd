import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../../service/customer/customer.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../../../model/customer/customer';
import {ActivatedRoute, ParamMap} from '@angular/router';

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
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap:ParamMap)=>{
      this.idCustomer = paramMap.get('id');
    });
    this.customerService.findById(this.idCustomer).subscribe(data =>{
      this.customer = data;
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
    this.validate()
  }
  validate(): void {
    this.customerForm.patchValue(this.customer);
    this.customerForm = new FormGroup({
        customerName: new FormControl('', [Validators.required, Validators.minLength(6)]),
        customerAddress: new FormControl('',Validators.required),
        customerBirthday: new FormControl('', [Validators.required]),
        customerGender: new FormControl('',Validators.required),
        customerEmail: new FormControl('',Validators.required),
        customerPhone: new FormControl('', Validators.required),
        customerPassport: new FormControl('',Validators.required)
      }
    );
  };

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  };


  editCustomer(){
    this.customer = this.customerForm.value;
    this.customerService.updateCustomer(this.idCustomer,this.customer).subscribe(()=>{
      alert("Thành công");
    },
      error => {
      alert("Thất bại");
      })
  }
}
