import { Injectable } from '@angular/core';
import {Customer} from '../../model/customer/customer';
import {Observable} from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private URL = 'http://localhost:8080/customer';
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
  constructor(private httpClient: HttpClient) { }
  getListCustomer(page: number): Observable<any> {
    return this.httpClient.get(this.URL + '/list' + '?page=' + page);

  }

  searchCustomer(page: number, field: any, search: any): Observable<any> {
    return this.httpClient.get(this.URL + '/search' + '?page=' + page + '&field=' + field + '&search=' + search);
  }

  deleteCustomer(data: any): Observable<any> {
    return this.httpClient.patch(this.URL + '/delete', data);
  }
}
