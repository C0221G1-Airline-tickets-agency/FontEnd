import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {UserRole} from "../../model/account/role";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  private API_URL = 'http://localhost:8080/api/user-role';

  constructor(private httpClient: HttpClient) { }

  getAllUserRole(): Observable<UserRole[]> {
    return this.httpClient.get<UserRole[]>(`${this.API_URL}`);
  }

  getUserRoleById(id: number): Observable<UserRole> {
    return this.httpClient.get<UserRole>(`${this.API_URL}/find/${id}`);
  }
}
