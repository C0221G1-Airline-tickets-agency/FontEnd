import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private http: HttpClient) { }

  // addDestination(destination: any, listScenic: any[]): Observable<any> {
  //   // const params = new HttpParams()
  //   //   .set('destination', `${destination}`)
  //   //   .set('listScenic', `${listScenic}`);
  //   // return this.http.post<any>(API_URL + '/destination/create',  );
  //   return this.http.post<any>(`${API_URL}/destination/create`,{null});
  // }
}
