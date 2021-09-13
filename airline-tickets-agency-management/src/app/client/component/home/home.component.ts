import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {Destination} from '../../../model/destination/Destination';
import {DestinationService} from '../../../service/destiantion/destination.service';
import {CheapestTicket} from '../../../model/home/cheapest-ticket';
import {TicketHomeService} from '../../../service/home/ticket-home.service';
import {formatDate} from '@angular/common';
import {Location} from '../../../model/home/location';
import {SearchTicket} from '../../../model/home/search-ticket';
import {Router} from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  ticketShow;
  index = 0;
  isTwoWay = 1;
  dayNow;
  // information Ticket
  locationTo = '';
  locationFrom = '';
  startDay = '';
  endDay = '';
  adults = 1;
  children = 0;
  baby = 0;
  // Chức năng
  locationList: Location[] = [];
  top10cheapestFlight: CheapestTicket[] = [];
  searchTicket: SearchTicket;

  page = 0;
  sortBy = 'destination_id';
  destinations: Destination[] = [];
  pages: Array<any> = [];
  destination: Destination[] = [];
  change: number;
  check = false;
  displayFlat: boolean= true;
  constructor(private ticketHomeService: TicketHomeService,
              private router: Router,
              private destinationService: DestinationService, private dialog: MatDialog,
              private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getDayNow();
    this.getAllLocation();
    this.getTop10cheapestFlights();
    this.startDay = this.dayNow;

    this.showDestination();
  }

  //#region effect ticket
  getDayNow() {
    this.dayNow = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
  }

  clickHidden(num: number) {
    this.ticketShow = document.getElementsByClassName('showHidden');
    // ------------------------------ Click HIDDEN / SHOW ---------------------------------------
    if (num !== 3) {
      if (this.ticketShow[num].style.display === 'block') {
        this.ticketShow[num].style.display = 'none';
        return;
      }
    }
    // ------------------------------ Click NEXT SHOW ---------------------------------------
    if (num === 3) {
      this.ticketShow[(num - 1)].style.display = 'none';
      return;
    }
    this.ticketShow[this.index].style.display = 'none';
    this.ticketShow[num].style.display = 'block';
    this.index = num;
  }
  chooseTicket(num: number) {
    this.isTwoWay = num;
  }

  //#endregion

  getAllLocation() {
    this.ticketHomeService.getAllLocations().subscribe(data => {
      if (!data) {
        return;
      }
      this.locationList = data;
    });
  }

  getTop10cheapestFlights() {
    this.ticketHomeService.getTop10cheapestFlights().subscribe(data => {
      this.top10cheapestFlight = data;
    });
  }

  chooseLocation(cityName: string) {
    if (!this.locationFrom) {
      this.locationFrom = cityName;
    } else if (!this.locationTo && this.locationFrom !== cityName) {
      this.locationTo = cityName;
    } else {
      return;
    }
  }

  //#region GET QUANTITY PASSENGER
  addPassenger(passenger: string) {
    if (this.adults >= 9 && passenger === 'adults' ||
      this.children >= this.adults && passenger === 'children') {
      return;
    }
    switch (passenger) {
      case 'adults':
        this.adults++;
        break;
      case 'children':
        this.children++;
        break;
      default:
        console.log('Bớt hack lại');
    }
  }

  subPassenger(passenger: string) {
    console.log(passenger);
    console.log(this.adults);
    if (this.adults <= 1 && passenger === 'adults' ||
      this.children <= 0 && passenger === 'children') {
      return;
    }
    switch (passenger) {
      case 'adults':
        if (this.adults === this.children) {
          this.children--;
        }
        this.adults--;
        break;
      case 'children':
        this.children--;
        break;
      default:
        console.log('Bớt hack lại');
    }
  }
  getSearchTicket() {
    if ((this.isTwoWay && (!this.locationTo || !this.locationFrom || !this.endDay)) ||
      (!this.isTwoWay && (!this.locationTo || !this.locationFrom))) {
      Swal.fire({
        icon: 'error',
        title: 'Xảy ra lỗi',
        text: 'Vui lòng điền đầy đủ thông tin!'
      });
      return;
    }
    this.searchTicket = {
      locationTo: this.locationTo,
      locationFrom: this.locationFrom,
      departureTime: this.startDay,
      endTime: this.endDay,
      passenger: this.adults + ',' + this.children
    };
    this.router.navigateByUrl('/test', {state: this.searchTicket});
  }

  chosenFlight(flightId: number) {
    this.isTwoWay = 0;
    console.log(this.isTwoWay);
    this.top10cheapestFlight.forEach(item => {
      if (item.flightId === flightId) {
        this.locationFrom = item.locationFromName;
        this.locationTo = item.locationToName;
        this.startDay = item.flightDate;
      }
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  showDestination() {
    this.destinationService.showListDestination(this.page, this.sortBy).subscribe(destination => {
      // tslint:disable-next-line:triple-equals
      if (destination == undefined) {
        this.destinations = [];
        this.page = 0;
      }
      destination.numberOfElements === 1 ? this.check = true : this.check = false;
      this.destinations = destination.content;
      this.pages = new Array<any>(destination.totalPages);
    });
  }

  setPage(i: number) {
    this.page = i;
    this.showDestination();
  }

  errorPage() {
    this.toastr.error('không tìm thấy trang', 'thông báo');
  }

  previous() {
    if (this.page === 0) {
      this.errorPage();
    } else {
      this.page = this.page - 1;
      this.showDestination();
    }
  }
  next() {
    if (this.page > this.pages.length - 2) {
      this.errorPage();
    } else {
      this.page = this.page + 1;
      this.showDestination();
    }
  }

  showSuccessDelete() {
    this.toastr.success('Đã xóa thành công !', 'Thông báo : ');
  }

  showErrorDelete() {
    this.toastr.error('Vui lòng chọn nhân viên bạn muốn xóa !', 'Cảnh báo : ');
  }

  deleteDestination(destinationName, destinationId) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xoá?',
      html: '<span style="color: #dc3545">' + 'địa điểm: ' +  destinationName  + '</span>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: '&emsp;Huỷ&emsp;',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.destinationService.deleteDestinationByRequest(destinationId).subscribe(e => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Xoá thành công',
              showConfirmButton: false,
              timer: 1500
            });
            if (this.check) {
              this.page = this.pages.length - 1;
            }
            this.showDestination();
          }, error => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Lỗi',
              showConfirmButton: false,
              timer: 1500
            });
            this.showDestination();
          }
        );
      }
    });
  }


  controlInbox() {
    if(this.displayFlat){
      this.displayFlat=false;
    }else {
      this.displayFlat=true;
    }
  }
  closeBox(e:boolean) {
    this.displayFlat=e;
  }

}
