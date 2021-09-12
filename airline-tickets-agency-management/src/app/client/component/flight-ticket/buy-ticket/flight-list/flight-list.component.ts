import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {formatDate} from '@angular/common';
import {SearchFlightDto} from '../../../../../model/flight-ticket/searchFlightDto';
import {Location} from '../../../../../model/flight-ticket/Location';
import {SearchFlightService} from '../../../../../service/flight-ticket/search-flight/search-flight.service';
import {TicketService} from '../../../../../service/flight-ticket/ticket/ticket.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  // search flight
  searchFlightList: SearchFlightDto[] = [];
  flightGoList: SearchFlightDto[] = [];
  flightReturnList: SearchFlightDto[] = [];
  searchGoSuccess = false;
  searchReturnSuccess = false;
  searched = false;
  orderBy = 'ticketId';
  // end search flight
  ticketShow;
  index = 0;
  isTwoWay = 1;
// information Ticket
  locationTo: Location;
  locationToCity = '';
  locationFrom: Location;
  locationFromCity = '';
  flightDate;
  returnDate;
  adults = 0;
  children = 0;
  passengerType1;
  passengerType2;
  baby = 0;
  locationSelected = false;
  weekdays = [];
  weekdaysGo = [];
  weekdaysReturn = [];
  dates = [];
  datesGo = [];
  datesReturn = [];
//   informartion search flight
  locationFromSearch: Location;
  locationToSearch: Location;
  flightGoDateSearch: Date;
  flightReturnDateSearch: Date;
  // Ticket detail
  ticketDetailId: number;
  clickedButtonDetail = false;
  // Chức năng
  locationList: Location[];

  constructor(private searchFlightService: SearchFlightService,
              private ticketService: TicketService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllLocations();
  }
  getDay(day) {
    const y = 24 * 60 * 60 * 1000;
    const x = day.getTime();
    this.dates = [x - 3 * y, x - 2 * y, x - y, x, x + y, x + 2 * y, x + 3 * y];
    switch (day.getDay()) {
      case 1:
        this.weekdays = ['Thứ 6', 'Thứ 7', 'Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5'];
        break;
      case 2:
        this.weekdays = ['Thứ 7', 'Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'];
        break;
      case 3:
        this.weekdays = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        break;
      case 4:
        this.weekdays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

        break;
      case 5:
        this.weekdays = ['Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật', 'Thứ 2'];

        break;
      case 6:
        this.weekdays = ['Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật', 'Thứ 2', 'Thứ 3'];
        break;
      case 0:
        this.weekdays = ['Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4'];
        break;
    }
  }
  // CHANGE DAY
  changeDayGo(order) {
   this.flightDate = new Date(this.datesGo[order]);
   const day = this.flightDate.getDate();
   const month = this.flightDate.getMonth() + 1;
   const year = this.flightDate.getFullYear();
   const date = year + '-' + month + '-' + day;
    this.searchFlightService.searchFlight(this.locationFrom.locationId, this.locationTo.locationId, date, this.passengerType1, this.passengerType2, this.orderBy).subscribe((searchFlightList: SearchFlightDto[]) => {
      this.flightGoList = searchFlightList;
      this.flightGoDateSearch = new Date(date);
      this.flightDate = date;
      this.getDay(new Date(this.flightGoDateSearch));
      this.weekdaysGo = this.weekdays;
      this.datesGo = this.dates;
      if (searchFlightList == null) {
        this.searchGoSuccess = false;
      } else {
        this.searchGoSuccess = true;
      }
    });
  }
  changeDayReturn(order) {
    this.returnDate = new Date(this.datesReturn[order]);
    const day = this.returnDate.getDate();
    const month = this.returnDate.getMonth() + 1;
    const year = this.returnDate.getFullYear();
    const date = year + '-' + month + '-' + day;
    this.searchFlightService.searchFlight(this.locationTo.locationId, this.locationFrom.locationId, date, this.passengerType1, this.passengerType2, this.orderBy).subscribe((searchFlightList: SearchFlightDto[]) => {
      this.flightReturnList = searchFlightList;
      this.flightReturnDateSearch = new Date(date);
      this.returnDate = date;
      this.getDay(new Date(this.flightReturnDateSearch));
      this.weekdaysReturn = this.weekdays;
      this.datesReturn = this.dates;
      if (searchFlightList == null) {
        this.searchReturnSuccess = false;
      } else {
        this.searchReturnSuccess = true;
      }
    });
  }
  //#region effect ticket
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

  getAllLocations() {
    this.searchFlightService.getAllLocations().subscribe(data => {
      if (!data) {
        return;
      }
      this.locationList = data;
    });
  }

  chooseLocation(location: Location) {
    if (!this.locationSelected) {
      this.locationFrom = location;
      this.locationFromCity = location.cityName;
      this.locationSelected = true;
    } else {
      this.locationTo = location;
      this.locationToCity = location.cityName;
      this.locationSelected = false;
    }
  }
  formatDate(event) {
    this.returnDate = new Date(event);
  }

//#region GET QUANTITY PASSENGER
  addPassenger(passenger: string) {
    if (this.adults >= 9 && passenger === 'adults' ||
      this.children >= this.adults && passenger === 'children' ||
      this.baby >= this.adults && passenger === 'baby') {
      return;
    }
    switch (passenger) {
      case 'adults':
        this.adults++;
        break;
      case 'children':
        this.children++;
        break;
      case 'baby':
        this.baby++;
        break;
      default:
        console.log('Bớt hack lại');
    }
  }

  subPassenger(passenger: string) {
    console.log(passenger);
    console.log(this.adults);
    if (this.adults <= 1 && passenger === 'adults' ||
      this.children <= 0 && passenger === 'children' ||
      this.baby <= 0 && passenger === 'baby') {
      return;
    }
    switch (passenger) {
      case 'adults':
        if (this.adults === this.children) {
          this.children--;
        }
        if (this.adults === this.baby) {
          this.baby--;
        }
        this.adults--;
        break;
      case 'children':
        this.children--;
        break;
      case 'baby':
        this.baby--;
        break;
      default:
        console.log('Bớt hack lại');
    }
  }

//#endregion
// #getOrderBy
  changeOrderBy(orderBy) {
    this.orderBy = orderBy;
  }
  getSearchTicket() {
    if ((this.isTwoWay && (!this.locationTo || !this.locationFrom || !this.returnDate)) ||
      (!this.isTwoWay && (!this.locationTo || !this.locationFrom)) || (this.adults == 0 && this.children == 0)) {
      Swal.fire({
        icon: 'error',
        title: 'Xảy ra lỗi',
        text: 'Vui lòng điền đầy đủ thông tin!'
      });
      return;
    } else {
      if (this.adults > 0) {
        this.passengerType1 = 'người lớn';
        if (this.children > 0) {
          this.passengerType2 = 'trẻ em';
        } else {
          this.passengerType2 = 'nguời lớn';
        }
      } else {
        this.passengerType1 = 'trẻ em';
        this.passengerType2 = 'trẻ em';
      }
      this.locationFromSearch = this.locationFrom;
      this.locationToSearch = this.locationTo;
      this.searchFlightService.searchFlight(this.locationFrom.locationId, this.locationTo.locationId, this.flightDate, this.passengerType1, this.passengerType2, this.orderBy).subscribe((searchFlightList: SearchFlightDto[]) => {
        this.flightGoList = searchFlightList;
        this.flightGoDateSearch = this.flightDate;
        this.getDay(new Date(this.flightGoDateSearch));
        this.weekdaysGo = this.weekdays;
        this.datesGo = this.dates;
        if (searchFlightList == null) {
          this.searchGoSuccess = false;
        } else {
          this.searchGoSuccess = true;
        }
      });
      if (this.isTwoWay) {
        this.searchFlightService.searchFlight(this.locationTo.locationId, this.locationFrom.locationId, this.returnDate, this.passengerType1, this.passengerType2, this.orderBy).subscribe((searchFlightList: SearchFlightDto[]) => {
          this.flightReturnList = searchFlightList;
          this.flightReturnDateSearch = this.returnDate;
          this.getDay(new Date(this.flightReturnDateSearch));
          this.weekdaysReturn = this.weekdays;
          this.datesReturn = this.dates;
          if (searchFlightList == null) {
            this.searchReturnSuccess = false;
          } else {
            this.searchReturnSuccess = true;
          }
        });
      }
      this.searched = true;
    }
  }
  ticketDetail(ticketId): void {
      this.ticketDetailId = ticketId;
      if (this.clickedButtonDetail) {
        this.clickedButtonDetail = false;
      } else {
        this.clickedButtonDetail = true;
      }
  }
}
