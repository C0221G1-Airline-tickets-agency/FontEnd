import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CheapestTicket} from '../../model/home/cheapest-ticket';
import {Location} from '../../model/home/location';

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

  getTop10cheapestFlights(): Observable<CheapestTicket[]> {
    return this.http.get<CheapestTicket[]>(this.API_URL + '/top10cheapestFlights');
  }
}
