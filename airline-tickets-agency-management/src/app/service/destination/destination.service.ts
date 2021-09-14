import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Destiation} from '../../model/destination/destiation';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private http: HttpClient) { }

  addDestination(destination: any): Observable<any> {
    return this.http.post<any>(API_URL + '/destination/create', destination);
  }
  findById(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/destination/${id}`);
  }
  updateDestination(destination: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/destination/edit`, destination);
  }
  getScenic(idDestination: number): Observable<any> {
    const params = new HttpParams()
      .set('idDestination', `${idDestination}`);
    return this.http.get<any>(API_URL + '/destination/scenics', {params});
  }
  delScenic(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/destination/scenic/${id}`);
  }
  addScenic(scenic: any): Observable<any> {
    return this.http.post<any>(API_URL + '/destination/scenic/create', scenic);
  }
  updateScenic(scenic: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/destination/scenic/edit`, scenic);
  }
  findScenicById(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/destination/scenic/${id}`);
  }
}
