import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TicketCustomerDto} from '../../model/flight-ticket/TicketCustomerDto';

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

  updateTicketPaid(id: string): Observable<any> {
    return this.http.delete(this.TICKET_API + '/update-ticket-paid?id=' + id);
  }

  sendMailInformation(email: string, listTicket: TicketCustomerDto[]): Observable<any> {
    const listTest = {ticketMailDtoList: listTicket, email};
    return this.http.post(this.TICKET_API + '/email/send', listTest);
  }


}
