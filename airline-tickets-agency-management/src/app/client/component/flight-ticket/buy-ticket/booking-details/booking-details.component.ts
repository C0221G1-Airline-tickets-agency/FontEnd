import {Component, Inject, OnInit} from '@angular/core';
import {TicketService} from '../../../../../service/flight-ticket/ticket/ticket.service';
import {Ticket} from '../../../../../model/flight-ticket/ticket';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PassengerInformationComponent} from '../passenger-information/passenger-information.component';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  ticket: Ticket;
  tickets: Ticket[] = [];

  listId: number[] ;




  constructor(private ticketService: TicketService,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<BookingDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.listId = this.data.data1;
    for (const id of this.listId) {
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

  openPassengerInformation() {
    const dialogRef = this.dialog.open(PassengerInformationComponent, {
      width: '1000px',
      height: '800px',
      data: {data1: this.listId}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // window.location.href = 'http://localhost:4200/customer/payment';
      }
      this.listId = [];
    });
  }
}
