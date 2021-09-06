import { Injectable } from '@angular/core';
import {Customer} from '../../model/customer/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  listCustomer: Customer[] = [
    {customerID: 1,
    customerName: 'tam',
    customerEmail: 'tam@gmail.com',
    customerCode: 'CC001',
      customerPhone: '012345678',
      customerGender: 'nam'
    },
    {customerID: 2,
      customerName: 'toàn',
      customerEmail: 'toan@gmail.com',
      customerCode: 'CC002',
      customerPhone: '012345678',
      customerGender: 'nam'
    },
    {customerID: 3,
      customerName: 'Hiếu',
      customerEmail: 'hieu@gmail.com',
      customerCode: 'CC003',
      customerPhone: '012345678',
      customerGender: 'nam'
    }
  ];
  constructor() { }
}
