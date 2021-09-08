import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Flight} from "../../../model/flight-ticket/flight";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private FLIGHT_API = 'http://localhost:8080/api/flight';

  constructor(private http: HttpClient) {
  }

  getAllFlight(page: number, search: any, select: any): Observable<any> {
    if (select === 'flightCode') {
      return this.http.get(this.FLIGHT_API + '?page=' + page + '&flightCode=' + search);
    } else if (select === 'flightPrice') {
      return this.http.get(this.FLIGHT_API + '?page=' + page + '&flightPrice=' + search);
    } else if (select === 'airlineName') {
      return this.http.get(this.FLIGHT_API + '?page=' + page + '&airlineName=' + search);
    } else if (select === 'departureTime') {
      return this.http.get(this.FLIGHT_API + '?page=' + page + '&departureTime=' + search);
    } else {
      return this.http.get(this.FLIGHT_API + '?page=' + page);
    }
  }

  getDeleteFlight(id: number): Observable<any> {
    return this.http.delete(this.FLIGHT_API + '/' + id);
  }

  //Hieu

  findFlightById(id: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.FLIGHT_API +'-find'}/${id}`)
  }
  saveFlight(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(this.FLIGHT_API +'/create', flight)
  }
  updateFlight(id: number, flight: Flight): Observable<Flight> {
    return this.http.put<Flight>(`${this.FLIGHT_API + '/update'}/${id}`, flight)
  }




}
