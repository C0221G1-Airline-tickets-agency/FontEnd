import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../../../../service/flight-ticket/ticket/ticket.service';
import {Ticket} from '../../../../../model/flight-ticket/ticket';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  ticket: Ticket;
  listId: number[] = [1,2,3];
  tickets: Ticket[] = [];


  constructor(private ticketService: TicketService) {
    this.viewTicket(this.listId);

  }

  ngOnInit(): void {
  }

  viewTicket(list: number[]){
    for (var i=0;i<list.length;i++) {
      return this.ticketService.findTicketById(list[i]).subscribe( ticket => {
        // console.log(ticket);
        this.tickets.push(ticket);
      });
    }
  }

}
