import {Component, OnInit} from '@angular/core';
import {Ticket} from '../../../../model/flight-ticket/ticket';
import {MatDialog} from '@angular/material/dialog';
import {TicketEditComponent} from "../ticket-edit/ticket-edit.component";
import {TicketPrintComponent} from "../ticket-print/ticket-print.component";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";
import Swal from "sweetalert2";
import {TicketService} from "../../../../service/flight-ticket/ticket/ticket.service";
import {Router} from "@angular/router";


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
              private toastr : ToastrService,
             private router: Router) {
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

  changeFilter() {
    this.formSearch.get('key').setValue('');
  }


  searchTicket() {
    this.keySearch = this.formSearch.get('key').value;
    this.filerType = this.formSearch.get('filter').value;
    this.page = 0;
    this.getListTicket();
    this.toastr.success('Tìm kiếm thành công','Thông báo : ')
  }


  getTicketId(ticketId: number, t: Ticket) {
    if(this.idSelect == ticketId ){
      this.idSelect = null;
      this.ticket = null;
    }else {
      this.idSelect = ticketId;
      this.ticket = t;
    }
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy')
  }

  formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
  });

  onEditHandler(){
    if (this.ticket == null) {
      this.toastr.error('Bạn chưa chọn vé','Cảnh báo :')
    } else {
      const dialogRef = this.dialog.open(TicketEditComponent, {
        width: '600px',
        data: this.ticket
      });
    }
  }
  onDeleteHandler() {
    if (this.idSelect == null) {
      this.toastr.error('Bạn chưa chọn vé','Cảnh báo : ')
    } else {
      Swal.fire({
        title: 'Xóa vé ?',
        width:400,
        heightAuto:true,
        html: '<hr><div style="text-align: left; padding-left: 30px; font-size: 14px"><p style="color: red;">Bạn có chắc chắn muốn xóa vé có :</p>\n' +
          '                    <p>Mã đặt chỗ: ' + this.ticket.chairName + '&emsp;&emsp;&emsp;&emsp;Họ tên: ' + this.ticket.passengerName + '</p>\n' +
          '                    <p>Chuyến bay: ' + this.ticket.flight.locationFrom.cityName + ' - ' + this.ticket.flight.locationTo.cityName + '</p>\n' +
          '                    <p>Ngày: ' + this.formatDate(this.ticket.flight.flightDate) + '</p>\n' +
          '                    <p style="text-align: left">Giá: ' + this.formatter.format(this.ticket.ticketPrice+(this.ticket.ticketPrice*this.ticket.ticketTypePrice)+this.ticket.plusBaggage+(this.ticket.ticketPrice*this.ticket.tax)-(this.ticket.ticketPrice*this.ticket.passengerTypePrice))+
          '</p></div><hr>',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: '#3085d6',
        cancelButtonText: '&emsp;Huỷ&emsp;',
        cancelButtonColor: '#dc3545',
        reverseButtons: true,
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

  onPrintHandler(): void {
    if (this.ticket == null) {
      this.toastr.error('Bạn chưa chọn vé','Cảnh báo :')
    } else {
      const dialogRef = this.dialog.open(TicketPrintComponent, {
        width: '900px',
        data: this.ticket
      });
    }
  }

  onInputHandler() {
    this.router.navigateByUrl("");
  }

  onReturnHandler() {
    this.router.navigateByUrl("");
  }

}
