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

  constructor(private ticketService: TicketService) {
    this.viewTicket(1);
  }

  ngOnInit(): void {
  }
  viewTicket(id: number){
    return this.ticketService.findTicketById(id).subscribe( ticket => {
      this.ticket = ticket;
    });
  }

}
