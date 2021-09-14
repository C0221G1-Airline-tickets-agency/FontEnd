import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/account/account';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/users/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/add-user`, user);
  }
}
