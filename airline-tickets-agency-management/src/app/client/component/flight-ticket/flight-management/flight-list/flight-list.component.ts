import {Component, OnInit} from '@angular/core';
import {Flight} from '../../../../../model/flight-ticket/Flight';
import {FlightService} from '../../../../../service/flight-ticket/flight/flight.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../../../../../service/dialog.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FlightEditComponent} from "../flight-edit/flight-edit.component";

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
  flightEdit: Flight;
  idFlight: number;
  page = 0;
  pages: Array<any>;
  search: any;
  selects: any;
  notfound = false;
  name: string;
  totalPage: number;
  Obj: null;

  constructor(private flightTicketService: FlightService,
              private matDialog: MatDialog,
              private dialogService: DialogService,
              private toast: ToastrService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAll();

  }


  getAll() {
    this.flightTicketService.getAllFlight(this.page, this.search, this.selects).subscribe(res => {
      this.flights = res.content;
      console.log(this.flights.length);
      if (this.flights.length === 0) {
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
      for (let i = 0; i < this.flights.length; i++) {
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

  setPage(i: number) {
    this.page = i;
    this.getAll();
  }

  previous() {
    if (this.page <= 0) {
      this.toast.warning('Không tìm thấy trang.', 'Trang trước');
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

    this.getAll();

  }

  backToMain() {
    this.dialogService.openConfirm1().afterClosed().subscribe(res => {
      if (res === true) {
        this.router.navigateByUrl('/');
      }
    });

  }

  onEditHandler() {
    console.log(this.idFlight);

    if (this.idFlight == null) {
      this.toast.warning('Bạn chưa chọn chuyến bay ');
    } else {
      this.flightTicketService.findFlightById(this.idFlight).subscribe(next => {
        this.flightEdit = next;
        this.edit();
      });
    }
  }

  edit(){
    const dialogRef = this.matDialog.open(FlightEditComponent, {
      width: '1000px',
      height : '1000px',
      data: this.flightEdit
    })

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        this.ngOnInit();
      }
    })

  }
}
