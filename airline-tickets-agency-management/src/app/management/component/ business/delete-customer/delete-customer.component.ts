import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CustomerService} from '../../../../service/customer/customer.service';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  deleteCustomer() {
    this.customerService.deleteCustomer(this.data).subscribe();

  }
}
