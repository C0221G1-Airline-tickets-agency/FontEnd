import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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
    }else if(select === 'flightDate') {
      return this.http.get(this.FLIGHT_API + '?page=' + page + '&flightDate=' + search);
    } else {
      return this.http.get(this.FLIGHT_API + '?page=' + page);
    }
  }

  getDeleteFlight(id: number): Observable<any> {
    return this.http.delete(this.FLIGHT_API + '/' + id);
  }
}
