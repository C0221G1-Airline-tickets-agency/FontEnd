
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../../model/employee';
import {AddRequest} from "../../model/employee/add-request";


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private URl = 'http://localhost:8080/employee';
  private API_URL = 'http://localhost:8080/api/employee';

  constructor(private http: HttpClient) {
  }

  getListEmployee(typeSearch: string, valueSearch: string, page: number): Observable<Employee[]> {
    return this.http.get<[]>(`${this.API_URL}/list?typeSearch=${typeSearch}&valueSearch=${valueSearch}&page=${page}`);
  }

  deleteEmployee(employeeId: number) {
    return this.http.get(`${this.API_URL}/delete/${employeeId}`);
  }

  getEmployee(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(this.API_URL + '/find/' + employeeId);
  }

  addEmployee(addRequest: AddRequest) {
    console.log(addRequest);
    return this.http.post<Employee>(this.API_URL + '/add-employee', addRequest);
  }

  updateEmployee(addRequest: AddRequest, employeeId: number) {
    return this.http.put(this.API_URL + '/update-employee', addRequest);

  }
}
