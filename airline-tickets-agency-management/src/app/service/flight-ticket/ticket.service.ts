import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private TICKET_API = 'http://localhost:8080/api/tickets';

  constructor(private http: HttpClient) {
  }

  getListTicketCustomerBook(id: number, index: number): Observable<any> {
    return this.http.get(this.TICKET_API + '/get-ticket-customer-book?id=' + id + '&index=' + index);
  }

  getListTicketCustomerTransaction(id: number, index: number): Observable<any> {
    return this.http.get(this.TICKET_API + '/get-ticket-customer-transaction?id=' + id + '&index=' + index);
  }

  updateTicketCancel(id: number): Observable<any> {
    return this.http.delete(this.TICKET_API + '/update-ticket-cancel?id=' + id);
  }

  updateTicketPaid(id: number): Observable<any> {
    return this.http.delete(this.TICKET_API + '/update-ticket-paid?id=' + id);
  }
}
