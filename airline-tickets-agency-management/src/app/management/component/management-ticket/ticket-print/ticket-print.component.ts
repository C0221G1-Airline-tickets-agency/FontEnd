import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
import {element} from 'protractor';
import jsPDF from 'jspdf';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-ticket-print',
  templateUrl: './ticket-print.component.html',
  styleUrls: ['./ticket-print.component.css']
})
export class TicketPrintComponent implements OnInit {
  title = 'in';
  gender: string;
  // tslint:disable-next-line:max-line-length
  money = this.data.ticketPrice + (this.data.tax * this.data.ticketPrice) + (this.data.ticketPrice * this.data.ticketTypePrice) - (this.data.ticketPrice * this.data.passengerTypePrice) + this.data.plusBaggage;
  ticketBack: string;
  baggage: number;

  constructor(public dialogRef: MatDialogRef<TicketPrintComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService) {
    this.getGender();
    this.getBackGroup();
    this.getBaggage();
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getGender() {
    if (this.data.passengerGender === 'nam') {
      this.gender = 'Ông';
    } else {
      this.gender = 'Bà';
    }

  }

  getBaggage() {
    if (this.data.plusBaggage === 170000) {
      this.baggage = 15;
    } else if (this.data.plusBaggage === 100000) {
      this.baggage = 7;
    } else {
      this.baggage = 0;
    }
  }

  getBackGroup() {
    switch (this.data.flight.airline.airlineName) {
      case 'Jetstar Pacific Airlines':
        this.ticketBack = '#FF5200';
        break;
      case 'Bamboo Airways':
        this.ticketBack = '#1f9638';
        break;
      case 'Vietjet Air':
        this.ticketBack = '#ed1b24';
        break;
      case 'Vietnam Airlines':
        this.ticketBack = '#004282';
        break;
      case 'Japan Air':
        this.ticketBack = '#aaaaaa';
        break;
      case 'Mekong Airline':
        this.ticketBack = '#1a375f';
        break;

    }
  }

  in() {
    const e = document.getElementById('ve');
    // @ts-ignore
    html2canvas(e).then((canvas) => {
      const imgDta = canvas.toDataURL('image/png');
      // @ts-ignore
      const doc = new jsPDF();
      const imgHeight = canvas.height * 208 / canvas.width;
      doc.addImage(imgDta, 0, 0, 208, imgHeight);
      doc.save('image.pdf');
      this.toastr.success('In thành công!!!', 'Thông báo');
    });
  }

  err() {
    this.toastr.error('In thất bại!!!', 'Cảnh báo');
  }

}
