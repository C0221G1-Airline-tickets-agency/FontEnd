import {Component, Inject, OnInit} from '@angular/core';
import {TicketService} from '../../../../../service/flight-ticket/ticket/ticket.service';
import {Ticket} from '../../../../../model/flight-ticket/ticket';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  ticket: Ticket;
  tickets: Ticket[] = [];
  listId: number[] = [];


  constructor(private ticketService: TicketService,
              private dialogRef: MatDialogRef<BookingDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    for (const id of this.data.data1) {
      this.viewTicket(id);
    }
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
