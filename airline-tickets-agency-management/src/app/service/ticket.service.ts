import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Ticket} from '../model/flight-ticket/ticket';


const API_URL = `${'http://localhost:8080/ticket'}`;


@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${API_URL}`);
  }

  update(ticketId: number, ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${API_URL}/edit/${ticketId}`, ticket);
  }
}
