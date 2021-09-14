import {Component, Inject, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {formatDate} from '@angular/common';
import {SearchFlightDto} from '../../../../../model/flight-ticket/searchFlightDto';
import {Location} from '../../../../../model/flight-ticket/Location';
import {SearchFlightService} from '../../../../../service/flight-ticket/search-flight/search-flight.service';
import {TicketService} from '../../../../../service/flight-ticket/ticket/ticket.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {TicketNumber} from "../../../../../model/flight-ticket/ticketNumber";
import {TicketArrayId} from "../../../../../model/flight-ticket/ticketArrayId";
import {BookingDetailComponent} from "../booking-details/booking-detail.component";


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
  currentDate = new Date();
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
  // buy ticket
  added = false;
  listTicketArrayId = [];
  listTicketId = [];
  ticketId = '';
  ticketNumberList: TicketNumber[];
  ticketArrayIdList: TicketArrayId[];
  // Chức năng
  locationList: Location[];
  data: any = null;

  constructor(private searchFlightService: SearchFlightService,
              private ticketService: TicketService,
              private dialog: MatDialog,
              // private location: Location
  ) {
  }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.getAllLocations();
    this.data = {departureTime: '2021-10-22',
    endTime: '',
    locationFrom: 'Hà Nội',
    locationTo: 'Hải phòng',
    navigationId: 2,
    passenger: [1, 0]
    };

    // this.data = this.location.getState();
    this.start();
  }

  start() {
    this.flightDate = this.data.departureTime;
    if (this.data.endTime == '') {
      this.isTwoWay = 0;
      this.returnDate = '';
    } else {
      this.isTwoWay = 1;
    }
    this.searchFlightService.findLocationByCityName(this.data.locationFrom).subscribe((data: Location)  => {
      this.locationFrom = data;
      this.locationFromCity = data.cityName;
    });
    this.searchFlightService.findLocationByCityName(this.data.locationTo).subscribe((data: Location)  => {
      this.locationTo = data;
      this.locationToCity = data.cityName;
    });
    this.adults = this.data.passenger[0];
    this.children = this.data.passenger[1];
    console.log(this.locationFrom);
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
    if (this.adults >= 9 && passenger === 'adults') {
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
    if (this.adults <= 0 && passenger === 'adults' ||
      this.children <= 0 && passenger === 'children' ||
      this.baby <= 0 && passenger === 'baby') {
      return;
    }
    switch (passenger) {
      case 'adults':
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

  checkChosen(id) {
    if (this.listTicketArrayId.length == 0) {
      return false;
    }
    for (const ticketId of this.listTicketArrayId) {
      if (id === ticketId) {
        this.added = true;
        break;
      }
      this.added = false;
    }
    return this.added;
  }

  changeColor(id) {
    let color = '';
    if (this.checkChosen(id)) {
      color = 'linear-gradient(6.71deg, #F9A51A 2.28%, #FBB612 27.93%, #FBF300 86.9%)';
    } else {
      color = '';
    }
    if (this.listTicketArrayId.length == 0) {
      color = '';
    }
    return color;
  }

  addTicketId(ticketId, ticketArrayId) {
    const couple: TicketArrayId = {ticketId, ticketArrayId};
    if (!this.checkChosen(ticketId)) {
      this.listTicketArrayId.push(ticketId);
      if (this.ticketArrayIdList == null) {
        this.ticketArrayIdList = [couple];
      } else {
        this.ticketArrayIdList.push(couple);
      }
      this.changeColor(ticketId);
    } else {
      for (let i = 0; i < this.listTicketArrayId.length; i++) {
        if (this.listTicketArrayId[i] == ticketId) {
          this.listTicketArrayId.splice(i, 1);
          this.ticketArrayIdList.splice(i, 1);
        }
      }
      this.changeColor(ticketId);
    }
    console.log(this.listTicketArrayId);
    console.log(this.ticketArrayIdList);
  }

  getSearchTicket() {
    if ((this.isTwoWay && (!this.locationTo || !this.locationFrom || !this.returnDate || !this.flightDate)) ||
      (!this.isTwoWay && (!this.locationTo || !this.locationFrom || !this.flightDate)) || (this.adults == 0 && this.children == 0)) {
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
    if (this.ticketDetailId == ticketId) {
      this.clickedButtonDetail = !this.clickedButtonDetail;
    } else {
      this.ticketDetailId = ticketId;
      this.clickedButtonDetail = true;
    }
  }

  createListId(length) {
    const ids: number[] = [];
    for (let i = 1; i <= length; i++) {
      ids.push(i);
    }
    return ids;
  }

  getTicketNumber(ticketId, ticketNumber) {
    const couple: TicketNumber = {ticketId, ticketNumber};
    if (this.ticketNumberList == null) {
      this.ticketNumberList = [couple];
    }
    for (let i = 0; i < this.ticketNumberList.length; i++) {
      if (ticketId == this.ticketNumberList[i].ticketId) {
        this.ticketNumberList.splice(i, 1);
      }
    }
    this.ticketNumberList.push(couple);
    console.log(this.ticketNumberList);
  }

  buyTicket() {
    if (this.ticketArrayIdList == null) {
      Swal.fire({
        icon: 'error',
        title: 'Chưa chọn vé',
        text: 'Vui lòng chọn vé!'
      });
    } else if (this.ticketNumberList == null) {
      Swal.fire({
        icon: 'error',
        title: 'Chưa chọn số lượng vé',
        text: 'Vui lòng chọn số lượng vé!'
      });
    } else {
      for (let i = 0; i < this.ticketArrayIdList.length; i++) {
        for (let j = 0; j < this.ticketNumberList.length; j++) {
          if (this.ticketArrayIdList[i].ticketId == this.ticketNumberList[j].ticketId) {
            const list = this.ticketArrayIdList[i].ticketArrayId;
            const listId = list.split(',');
            for (let k = 0; k < this.ticketNumberList[i].ticketNumber; k++) {
              this.listTicketId.push(listId[k]);
            }
          }
        }
      }
      const dialogRef = this.dialog.open(BookingDetailComponent, {
        width: '500px',
        height: '300px',
        data: {data1: this.listTicketId}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        window.location.href = 'http://localhost:4200/customer/payment';
      });
    }
  }
}
