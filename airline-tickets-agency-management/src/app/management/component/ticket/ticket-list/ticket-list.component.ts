import {Component, OnInit} from '@angular/core';
import {Ticket} from "../../../../model/flight-ticket/ticket";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TicketService} from "../../../../service/flight-ticket/ticket/ticket.service";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import Swal from 'sweetalert2';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  pages: Array<any> = [];
  page = 0;
  filerType = 0;
  keySearch = "";
  idSelect: number;
  ticket: Ticket;
  err = true;
  formSearch: FormGroup;

  constructor(private ticketService: TicketService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              private toastr : ToastrService) {
  }

  ngOnInit(): void {
    this.getListTicket();
    this.createForm();
  }

  getListTicket() {
    this.ticketService.findTicketsByFilter(this.filerType, this.keySearch, this.page).subscribe(data => {
      if (data == null) {
        this.tickets = [];
        this.pages = new Array<any>();
      } else {
        this.tickets = data.content;
        this.pages = new Array<any>(data.totalPages);
      }
    })
  }

  createForm() {
    this.formSearch = this.fb.group({
      filter: new FormControl(0),
      key: new FormControl()
    })
  }

  previous() {
    if (this.page === 0) {
      this.toastr.error('Không tìm thấy trang !', 'Cảnh báo : ');
    } else {
      this.page = this.page - 1;
      this.getListTicket();
    }
  }

  next() {
    if (this.page > this.pages.length - 2) {
      this.toastr.error('Không tìm thấy trang !', 'Cảnh báo : ');
    } else {
      this.page = this.page + 1;
      this.getListTicket();
    }
  }

  setPage(i: number) {
    this.page = i;
    this.getListTicket();
  }

  deleteTicket() {
    if (this.idSelect == null) {

    } else {
      Swal.fire({
        title: 'Xóa vé?',
        html: '<p style="color: red">Bạn có chắc chắn muốn xóa vé có :</p>\n' +
          '                    <p>Mã đặt chỗ: ' + this.ticket.chairName + '&emsp;&emsp;&emsp;&emsp;&emsp;Họ tên: ' + this.ticket.passengerName + '</p>\n' +
          '                    <p>Chuyến bay: ' + this.ticket.flight.locationFrom.cityName + ' - ' + this.ticket.flight.locationTo.cityName + '</p>\n' +
          '                    <p>Ngày: ' + this.formatDate(this.ticket.flight.flightDate) + '</p>\n' +
          '                    <p>Giá: ' + this.formatter.format(this.ticket.ticketPrice+(this.ticket.ticketPrice*this.ticket.ticketTypePrice)+this.ticket.plusBaggage+(this.ticket.ticketPrice*this.ticket.tax)-(this.ticket.ticketPrice*this.ticket.passengerTypePrice))+ '</p>',
        showCancelButton: true,
        confirmButtonText: '<i class="fa fa-trash-o"></i> Xóa',
        confirmButtonColor: '#dc3545',
        cancelButtonText: '<i class="fa fa-reply"></i> Trở về',
        cancelButtonColor: '#0062D2'
      }).then((result) => {
        if (result.isConfirmed) {
          this.ticketService.deleteTicketById(this.idSelect).subscribe(() => {
            this.toastr.success('Xóa vé thành công','Thông báo : ')
          }, error => {
            this.toastr.error('Xóa vé thất bại','Cảnh báo : ')
          }, () => {
            this.idSelect = null;
            this.ticket = null;
            this.getListTicket();
          })
        }
      })
    }
  }

  searchTicket() {
    this.keySearch = this.formSearch.get('key').value;
    this.filerType = this.formSearch.get('filter').value;
    this.page = 0;
    this.getListTicket();
    this.toastr.success('Tìm kiếm thành công','Thông báo : ')
  }

  getPres(t: Ticket) {
    this.ticket = t;
  }

  getTicketId(ticketId: number) {
    this.err = !this.err;
    if (this.err === false) {
      this.idSelect = ticketId;

    } else {
      this.idSelect = null;
    }
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy')
  }
  formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
}
