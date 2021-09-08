import {Injectable} from '@angular/core';
import {Customer} from '../../model/customer/customer';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8080/api/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // listCustomer: Customer[] = [
  //   {customerID: 1,
  //   customerName: 'tam',
  //   customerEmail: 'tam@gmail.com',
  //   customerCode: 'CC001',
  //     customerPhone: '012345678',
  //     customerGender: 'nam'
  //   },
  //   {customerID: 2,
  //     customerName: 'toàn',
  //     customerEmail: 'toan@gmail.com',
  //     customerCode: 'CC002',
  //     customerPhone: '012345678',
  //     customerGender: 'nam'
  //   },
  //   {customerID: 3,
  //     customerName: 'Hiếu',
  //     customerEmail: 'hieu@gmail.com',
  //     customerCode: 'CC003',
  //     customerPhone: '012345678',
  //     customerGender: 'nam'
  //   }
  // ];
  constructor(private http: HttpClient) {
  }

  saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(API_URL + '/create', customer);
  }

  updateCustomer(id: number, data: Customer): Observable<Customer>{
    return this.http.put<Customer>(`${API_URL}/update/${id}`,data)
  }

  findById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${API_URL}/${id}`)
  }
}
