import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Ticket} from '../../../../model/flight-ticket/ticket';
import {ToastrService} from 'ngx-toastr';
import {TicketService} from "../../../../service/flight-ticket/ticket/ticket.service";
import {DatePipe} from "@angular/common";


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
              private ticketService: TicketService,
              private toastr: ToastrService,
              private datePipe: DatePipe) {
    this.getTicket();
  }

  ngOnInit(): void {
  }

  getTicket() {
    this.editForm = new FormGroup({
      ticketId: new FormControl(this.data.ticketId),
      ticketCode: new FormControl(this.data.ticketCode),
      passengerName: new FormControl(this.data.passengerName, [Validators.required, Validators.pattern('[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ ]*')]),      locationTo: new FormControl(this.data.flight.locationTo.cityName),
      locationFrom: new FormControl(this.data.flight.locationFrom.cityName),
      flightDate: new FormControl(this.formatDate(this.data.flight.flightDate)),
      price: new FormControl(this.formatter.format(this.money)),
      passengerEmail: new FormControl(this.data.passengerEmail, [Validators.required, Validators.email]),

    });
  }
  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy')
  }
  formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
  });

  onNoClick(): void {
    this.dialogRef.close();
  }


  update() {
    this.data.passengerName = this.editForm.value.passengerName;
    this.data.passengerEmail = this.editForm.value.passengerEmail;
    this.ticket = this.data;
    this.ticketService.update(this.data.ticketId, this.ticket).subscribe(() => {
      this.toastr.success('Cập nhật thành công!!!', 'Thông báo :');
    }, e => {
      this.toastr.error('Cập nhật thất bại!!!', 'Cảnh báo :');
    });
  }

  err() {
    this.toastr.error('Cập nhật thất bại!!!', 'Cảnh báo :');
  }
}
