import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {PasswordDto} from '../../model/password-dto';
import {Message} from "../../model/message";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) {
  }

  sendPassword(id: number, password: PasswordDto): Observable<Message> {
    return this.http.patch<Message>(`${API_URL}/password/${id}`, password);
  }
}
