import { Component, OnInit } from '@angular/core';
import {Ticket} from "../../../../model/flight-ticket/ticket";
import {FormControl} from "@angular/forms";
import {TicketService} from "../../../../service/ticket/ticket.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  pages: any;
  page = 0;
  filerType =0;
  keySearch = new FormControl('');
  idSelect : number;
  err = true;
  constructor(private ticketService: TicketService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getListTicket();
  }

  getListTicket(){
    this.ticketService.findTicketsByFilter(this.filerType,this.keySearch.value, this.page).subscribe(data => {
      this.tickets = data.content;
      this.pages = data.totalPages;
      console.log(this.tickets);
    } )
  }
  previous() {
    if (this.page === 0) {
      // this.toastr.error('Không tìm thấy trang !', 'Cảnh báo : ');
    } else {
      this.page = this.page - 1;
      this.getListTicket();
    }
  }

  next() {
    if (this.page > this.pages -2) {
      // this.toastr.error('Không tìm thấy trang !', 'Cảnh báo : ');
    } else {
      this.page = this.page + 1;
      this.getListTicket();
    }
  }

  setPage(i: number) {
    this.page = i;
    this.getListTicket();
  }

  clickDelete() {

  }

  selectFilter(value: any) {
    this.filerType = +value;
  }

  searchTicket() {
    this.getListTicket();
  }

  selectTicket(ticketId: number) {
    this.idSelect = ticketId;
  }
}
