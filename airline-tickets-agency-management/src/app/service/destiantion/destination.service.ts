import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Destination} from '../../model/destination/Destination';
const API_URL = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private http: HttpClient) { }

  // @ts-ignore
  showListDestination(page: number, sortBy: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<any>(API_URL + '/api/destination/list-destination' + '?page=' + page + '&sortBy=' + sortBy);
  }
  deleteDestinationByRequest(destinationId: number) {
    return this.http.delete<Destination>(API_URL + '/api/destination/delete-destination?id=' + destinationId);
  }
  showListScenic(id: number): Observable<any> {
    return this.http.get<any>(API_URL + '/api/destination/list-scenic?id=' + id);
  }
  destinationFind(id: number): Observable<Destination> {
    return this.http.get<Destination>(API_URL + '/api/destination/find-destination?id=' + id);
  }
}
