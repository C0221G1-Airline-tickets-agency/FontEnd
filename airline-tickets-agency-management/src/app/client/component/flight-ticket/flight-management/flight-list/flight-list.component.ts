import { Component, OnInit } from '@angular/core';
import {Flight} from '../../../../../model/flight-ticket/Flight';
import {FlightService} from '../../../../../service/flight-ticket/flight/flight.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../../../../../service/dialog.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  flights: Flight[] = [];
  error = true;
  selectedObj: Flight;
  flight: Flight;
  idFlight: number;
  page = 0;
  pages: Array<any>;
  search: any;
  selects: any;
  notfound = false;
  name: string;
  totalPage: number;
  Obj: null;
  arr:Array<any> = [1,2,3];
  constructor(private flightTicketService: FlightService,
              private matDialog: MatDialog,
              private dialogService: DialogService,
              private toast: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAll();

  }


  getAll() {
    this.flightTicketService.getAllFlight(this.page, this.search, this.selects).subscribe(res => {
      this.flights = res.content;
      console.log(this.flights.length);
      if (this.flights.length === 0 ) {
        this.notfound = true;
      } else {
        this.notfound = false;
      }
      this.pages = new Array<any>(res.totalPages);
      this.totalPage = res.totalPages;
    });
  }


  deleteById(flightId: number) {
    this.error = !this.error;
    if (this.error === false) {
      this.idFlight = flightId;
      console.log(this.idFlight);
    } else {
      this.idFlight = null;
      console.log(this.idFlight);
    }
  }

  onSelect(flightObj: Flight) {
    this.selectedObj = flightObj;
  }
  deleteFlight() {
    if (this.idFlight == null) {
        this.toast.warning('Bạn chưa chọn chuyến bay ');
    } else {
      for (let i = 0 ; i < this.flights.length ; i++) {
          if (this.idFlight === this.flights[i].flightId) {
            this.name = this.flights[i].flightCode;
            break;
          }
      }
      this.dialogService.openConfirm(this.name).afterClosed().subscribe(res => {
        if (res === true) {
          this.flightTicketService.getDeleteFlight(this.idFlight).subscribe(() => {
            this.toast.success('Bạn đã xóa chuyến bay thành công');
            this.ngOnInit();
          });
        }
      });

    }
  }
  indexPaginationChage(value: number) {
    this.page = value;
  }
  setPage(i: number) {
    this.page = i;
    this.getAll();
  }

  previous() {
    if (this.page <= 0) {
      this.toast.warning('Không tìm thấy trang.', 'Trang trước') ;
    } else {
      this.page = this.page - 1;
      this.getAll();
    }
  }
  next() {
    if (this.page > this.pages.length - 2) {
      this.toast.warning('Không tìm thấy trang.', 'Trang sau');
    } else {
      this.page = this.page + 1;
      this.getAll();
    }
  }

  searchFlight() {
    if(this.selects == ''){
      return this.toast.warning('Bạn chưa lựa chọn ','Tìm kiếm')
    }
      this.getAll();
  }
  backToMain() {
    this.dialogService.openConfirm1().afterClosed().subscribe(res => {
      if (res === true) {
        this.router.navigateByUrl('/');
      }
    });

  }

}
