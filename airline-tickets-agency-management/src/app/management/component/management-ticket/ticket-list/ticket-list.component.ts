import { Component, OnInit } from '@angular/core';
import {Ticket} from '../../../../model/flight-ticket/ticket';
import {TicketService} from '../../../../service/ticket.service';
import {MatDialog} from '@angular/material/dialog';
import {TicketEditComponent} from "../ticket-edit/ticket-edit.component";
import {TicketPrintComponent} from "../ticket-print/ticket-print.component";


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  tickets: Ticket[];
  ticket: Ticket;
  ticketColor: number;
  err = true;

  constructor(private ticketService: TicketService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.ticketService.getAll().subscribe(next => {
      this.tickets = next;
    });
  }

  ticketId(ticketId: number) {
    this.err = !this.err;
    if (this.err === false) {
      this.ticketColor = ticketId;

    } else {
      this.ticketColor = null;
    }
  }

  ticketObj(t: Ticket) {
    this.ticket = t;
  }

  onEditHandler(): void {
    if (this.ticketColor == null) {
      alert('vui lòng chọn trường muốn sửa.');
    } else {
      const dialogRef = this.dialog.open(TicketEditComponent, {
        width: '600px',
        data: this.ticket
      });
    }
  }
  //
  onPrintHandler(): void {
    if (this.ticketColor == null) {
      alert('vui lòng chọn trường muốn in.');
    } else {
      const dialogRef = this.dialog.open(TicketPrintComponent, {
        width: '900px',
        data: this.ticket
      });
    }
  }

}
