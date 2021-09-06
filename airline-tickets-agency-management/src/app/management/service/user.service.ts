import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Password} from '../model/password';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Message} from '../model/Message';
import {User} from '../model/user';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})


export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  findAdminById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${API_URL}/admin/findAdminById?id=${id}`);
  }

  updatePassword(id: number, password: Password): Observable<Message> {
    return this.httpClient.patch<Message>(`${API_URL}/admin/changePassword?id=${id}`, password);
  }
}
