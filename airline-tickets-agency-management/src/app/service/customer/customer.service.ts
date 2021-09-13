import {Injectable} from '@angular/core';
import {Customer} from '../../model/customer/customer';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8080/api/customer';




@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(API_URL + '/create', customer);
  }

  updateCustomer(id: number, customerDto: Customer): Observable<Customer>{
    return this.http.put<Customer>(`${API_URL}/update/${id}`,customerDto)
  }

  findById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${API_URL}/${id}`)
  }


  getListCustomer(page: number): Observable<any> {
    return this.http.get(API_URL + '/list' + '?page=' + page);

  }

  searchCustomer(page: number, field: any, search: any): Observable<any> {
    return this.http.get(API_URL + '/search' + '?page=' + page + '&field=' + field + '&search=' + search);
  }

  deleteCustomer(data: any): Observable<any> {
    return this.http.patch(API_URL + '/delete', data);

  }
}
