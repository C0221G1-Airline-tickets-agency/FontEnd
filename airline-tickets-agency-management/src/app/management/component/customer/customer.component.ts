import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../service/customer/customer.service';
import {Customer} from '../../../model/customer/customer';
import {ToastrService} from 'ngx-toastr';
import {DeleteCustomerComponent} from '../delete-customer/delete-customer.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  listCustomer: Customer[] = [];
  customer1: Customer;
  customer: Customer;
  idEdit: number;

  constructor(private customerService: CustomerService,
              private dialog: MatDialog,
              ) {
  }
  //  getListCustomer() {
  //   return this.customerService.listCustomer;
  // }

  ngOnInit(): void {
    // this.listCustomer = this.getListCustomer();
  }

  showChoose(customer: Customer) {
    this.customer1 = customer;
    this.idEdit = this.customer1.customerID;
  }

  sendToDialog(customer: Customer, i: number) {

  }

  openDeleteDialog() {
    if (this.customer1 !== undefined) {
      const dialog = this.dialog.open(DeleteCustomerComponent , {
        height: '305px' , width: '500px',
        data: this.customer1
      });
      dialog.afterClosed().subscribe(() => {

      });
    }
  }
}
