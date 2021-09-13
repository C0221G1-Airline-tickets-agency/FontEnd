import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Password} from "../../model/password";
import {Message} from "../../model/message";
import {User} from "../../model/user";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) {
  }

  findCustomerById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${API_URL}/customer/findCustomerById?id=${id}`);
  }

  updatePassword(id: number, password: Password): Observable<Message> {
    return this.httpClient.patch<Message>(`${API_URL}/customer/changePassword?id=${id}`, password);
  }
}
