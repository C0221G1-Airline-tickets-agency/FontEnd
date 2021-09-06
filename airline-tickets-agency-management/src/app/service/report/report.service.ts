import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Report} from '../../model/report';
const API_URL = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Report[]> {
    return this.http.get<Report[]>(`${API_URL}/api/reports/get-all`);
  }
}
