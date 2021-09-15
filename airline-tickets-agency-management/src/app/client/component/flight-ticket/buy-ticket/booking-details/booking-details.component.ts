import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../../../../service/flight-ticket/ticket/ticket.service';
import {Ticket} from '../../../../../model/flight-ticket/ticket';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  ticket: Ticket;
  tickets: Ticket[] = [];
  listId: number[] = [1,2];


  constructor(private ticketService: TicketService,
              private dialogRef: MatDialogRef<BookingDetailsComponent>) {
    for (const id of this.listId) {
      this.viewTicket(id);
    }
    console.log(this.tickets);
  }

  ngOnInit(): void {
  }
  viewTicket(id: number) {
      return this.ticketService.findTicketById(id).subscribe( ticket => {
        this.tickets.push(ticket);
      });

  }

  //
  // passId() {
  //   let str = 'http://localhost:4200/passenger-information';
  //   for (let i = 0; i<this.listId.length; i++) {
  //     str += '/id=' + this.listId[i];
  //   }
  //
  // }
  closeDialog() {
    this.dialogRef.close();
  }
}
