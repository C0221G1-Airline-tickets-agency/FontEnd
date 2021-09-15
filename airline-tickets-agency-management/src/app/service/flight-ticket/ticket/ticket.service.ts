import {Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ticket} from "../../../model/flight-ticket/ticket";



@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private API_TICKET = 'http://localhost:8080/api/tickets';


  constructor(private http: HttpClient) {
  }


  findTicketsByFilter(filterType: number, keySearch: string, page: number) : Observable<any>{
    return this.http.get<any>(this.API_TICKET + '/ticket-list' + '?filterType=' + filterType + '&keySearch=' + keySearch+ '&page='+page);
  }

  deleteTicketById(id: number){
    return this.http.delete(this.API_TICKET+'/ticket-delete/'+id);

  }
  update(ticketId: number, ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(this.API_TICKET + '/ticket-edit/' + ticketId, ticket);
  }

  findTicketById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_TICKET}/${id}`);
  }
  findById(id: number): Observable<any> {
    return this.http.get<any>(this.API_TICKET + '?id=' + id);
  }
  findManyTicketById(listId: string): Observable<any>{
    // @ts-ignore
    return this.http.get<any>(this.API_TICKET+'/manyticket/'+listId);
  }

}
