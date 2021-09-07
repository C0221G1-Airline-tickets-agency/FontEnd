import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../../model/employee';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }


  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${API_URL}/employee/${id}`);
  }
}
