
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Password} from "../../model/password";
import {Message} from "../../model/message";
import {User} from "../../model/user";
import {Customer} from "../../model/customer/customer";


const API_URL = `${environment.apiUrl}`;


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
  findCustomerById(id: number): Observable<User> {
    return this.http.get<User>(`${API_URL}/findCustomerById?id=${id}`);
  }

  updatePassword(id: number, password: Password): Observable<Message> {
    return this.http.patch<Message>(`${API_URL}/changePassword?id=${id}`, password);

  }
}
