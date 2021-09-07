import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TicketService} from '../../../../service/ticket.service';
import {Ticket} from '../../../../model/flight-ticket/ticket';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit {

  editForm: FormGroup;
  ticket: Ticket;
  // tslint:disable-next-line:max-line-length
  money = this.data.ticketPrice + (this.data.tax * this.data.ticketPrice) + (this.data.ticketPrice * this.data.ticketTypePrice) - (this.data.ticketPrice * this.data.passengerTypePrice) + this.data.plusBaggage;

  constructor(public dialogRef: MatDialogRef<TicketEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ticketService: TicketService) {
    this.getTicket();
  }

  ngOnInit(): void {
  }

  getTicket() {
    this.editForm = new FormGroup({
      ticketId: new FormControl(this.data.ticketId),
      ticketCode: new FormControl(this.data.ticketCode),
      passengerName: new FormControl(this.data.passengerName),
      locationTo: new FormControl(this.data.flight.locationTo.cityName),
      locationFrom: new FormControl(this.data.flight.locationFrom.cityName),
      flightDate: new FormControl(this.data.flight.flightDate),
      // tslint:disable-next-line:max-line-length
      price: new FormControl(this.money.toString().split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev;
      })),
      passengerEmail: new FormControl(this.data.passengerEmail),

    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  update() {

    this.data.passengerName = this.editForm.value.passengerName;
    this.data.passengerEmail = this.editForm.value.passengerEmail;
    this.ticket = this.data;
    this.ticketService.update(this.data.ticketId, this.ticket).subscribe(() => {
      alert('thành công');
    }, e => {
      alert('thất bại');
    });
  }

}
