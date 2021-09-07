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
  page = 0;
  pages: Array<number> ;
  field = 'name';
  search = '';
  displayPages: number[] = [];
  // tslint:disable-next-line:ban-types
  message: String;

  constructor(private customerService: CustomerService,
              private dialog: MatDialog,
              ) {
  }
   getListCustomer() {
     this.customerService.getListCustomer(this.page).subscribe(next => {
       this.listCustomer = next.content;
       this.pages = new Array(next.totalPages);
     });
   }

  ngOnInit(): void {
    // @ts-ignore
     this.getListCustomer();
  }

  showChoose(customer: Customer) {
    this.customer1 = customer;
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
        this.getListCustomer();
        this.customer1 = null;
      });
    }
  }

  getPrevius() {
    if (this.page === 0) {
    } else {
      this.page -= 1;
      this.getListCustomer();
    }
  }

  getNext() {
    if (this.page === this.pages.length - 1 ) {
      alert('dai');
    } else {
      this.page += 1;
      this.getListCustomer();
    }
  }

  searchCustomer() {
    console.log('message' + this.message);
    return this.customerService.searchCustomer(this.page, this.field, this.search).subscribe(next => {
      console.log(next.content);
      if (next.content.length === 0) {
      this.message = ' không tìm thấy kết quả';
      this.listCustomer = next.content;
      } else {
        this.listCustomer = next.content;
        this.pages = new Array(next.totalPages);
        this.message = undefined;
      }
    });
  }

  setPage(p) {
    this.page = p;
    this.getListCustomer();
  }
}
