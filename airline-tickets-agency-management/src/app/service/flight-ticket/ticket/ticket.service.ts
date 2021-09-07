import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import {Ticket} from '../model/flight-ticket/ticket';


@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private API_TICKET = 'http://localhost:8080/api/tickets';

  constructor(private http: HttpClient) {
  }

  update(ticketId: number, ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(this.API_TICKET + '/edit/' + ticketId, ticket);
  }


  findTicketsByFilter(filterType: number, keySearch: string, page: number): Observable<any> {
    return this.http.get<any>(this.API_TICKET + '/ticket-list' + '?filterType=' + filterType + '&keySearch=' + keySearch + '&page=' + page);
  }

  deleteTicketById(id: number) {
    return this.http.delete(this.API_TICKET + '/ticket-delete/' + id);
  }
}
