import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private FLIGHT_API = 'http://localhost:8080/api/flight';
  constructor(private http: HttpClient) { }

  getAllFlight(): Observable<any> {
    return this.http.get(this.FLIGHT_API);
  }

  getDeleteFlight(id: number): Observable<any> {
    return this.http.delete(this.FLIGHT_API + '/' + id);
  }
}
