import {Component, Inject, OnInit} from '@angular/core';
import {Ticket} from '../../../../../model/flight-ticket/ticket';
import {TicketService} from '../../../../../service/flight-ticket/ticket/ticket.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  ticket: Ticket;
  ticketId;
  constructor(private ticketService: TicketService,
              // private dialogRef: MatDialogRef<TicketDetailComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    // this.ticketId = this.data.data1;
    this.ticketId = 1;
    console.log(this.ticketId);
    this.viewTicket(this.ticketId);
  }
  viewTicket(id) {
    return this.ticketService.findTicketById(id).subscribe( ticket => {
      console.log(ticket);
      this.ticket = ticket;
    });
  }

}
