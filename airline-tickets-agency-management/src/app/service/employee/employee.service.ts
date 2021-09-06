import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../../model/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private URl = 'http://localhost:8080/employee';

  constructor(private http: HttpClient) {
  }

  getListEmployee(typeSearch: string, valueSearch: string, page: number): Observable<Employee[]> {
    return this.http.get<[]>(`${this.URl}/list?typeSearch=${typeSearch}&valueSearch=${valueSearch}&page=${page}`);
  }

  deleteEmployee(employeeId: number) {
    return this.http.get(`${this.URl}/delete/${employeeId}`);
  }
}
