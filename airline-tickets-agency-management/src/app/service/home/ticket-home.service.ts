import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketHomeService {

  API_URL = 'http://localhost:8080/api/homepage';
     
  constructor(private http: HttpClient) {
  }

  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.API_URL + '/all_location');
  }


}
