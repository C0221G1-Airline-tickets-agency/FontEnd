import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {formatDate} from '@angular/common';
import {SearchFlightDto} from '../../../../../model/flight-ticket/searchFlightDto';
import {Location} from '../../../../../model/flight-ticket/location';
import {SearchFlightService} from '../../../../../service/flight-ticket/search-flight.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  // search flight
  searchFlightList: SearchFlightDto[] = [];
  searchSuccess = false;
  // end search flight
  ticketShow;
  index = 0;
  isTwoWay = 1;
  daySearch;
// information Ticket
  locationTo: Location;
  locationToCity = '';
  locationFrom: Location;
  locationFromCity = '';
  flightDate: Date;
  endTime = '';
  adults = 0;
  children = 0;
  passengerType1;
  passengerType2;
  baby = 0;
  locationSelected = false;
  currentDate;
//   informartion search flight
  locationFromSearch: Location;
  locationToSearch: Location;
  flightDateSearch: Date;
  // Chức năng
  locationList: Location[];

  constructor(private searchFlightService: SearchFlightService) {
  }

  ngOnInit(): void {
    this.getAllLocations();
  }

  //#region effect ticket
  getDayNow(day) {
    switch (day) {
      case 1:
        this.currentDate = 'Thứ 2';
        break;
      case 2:
        this.currentDate = 'Thứ 3';
        break;
      case 3:
        this.currentDate = 'Thứ 4';
        break;
      case 4:
        this.currentDate = 'Thứ 5';
        break;
      case 5:
        this.currentDate = 'Thứ 6';
        break;
      case 6:
        this.currentDate = 'Thứ 7';
        break;
      case 0:
        this.currentDate = 'Chủ nhật';
        break;
    }
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

  getSearchTicket() {
    if ((this.isTwoWay && (!this.locationTo || !this.locationFrom || !this.endTime)) ||
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
      this.searchFlightService.searchFlight(this.locationFrom.locationId, this.locationTo.locationId, this.flightDate, this.passengerType1, this.passengerType2).subscribe((searchFlightList: SearchFlightDto[]) => {
        this.searchFlightList = searchFlightList;
      });
      this.locationFromSearch = this.locationFrom;
      this.locationToSearch = this.locationTo;
      this.flightDateSearch = this.flightDate;
      this.daySearch = (new Date(this.flightDateSearch));
      this.getDayNow(this.daySearch.getDay());
      this.searchSuccess = true;
    }
  }


}
