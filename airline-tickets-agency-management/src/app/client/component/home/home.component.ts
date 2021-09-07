import {Component, OnInit} from '@angular/core';
import {CheapestTicket} from '../../../model/home/cheapest-ticket';
import {TicketHomeService} from '../../../service/home/ticket-home.service';
import {formatDate} from '@angular/common';
import {Location} from '../../../model/home/location';
import {SearchTicket} from '../../../model/home/search-ticket';
import {Router} from '@angular/router';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ticketShow;
  index = 0;
  isTwoWay = 1;
  dayNow;
  // information Ticket
  locationTo = '';
  locationFrom = '';
  departureTime = '';
  endTime = '';
  adults = 1;
  children = 0;
  baby = 0;
  // Chức năng
  locationList: Location[] = [];
  top10cheapestFlight: CheapestTicket[] = [];
  searchTicket: SearchTicket;

  constructor(private ticketHomeService: TicketHomeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getDayNow();
    this.getAllLocation();
    this.getTop10cheapestFlights();
    this.departureTime = this.dayNow;
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
      departureTime: this.departureTime,
      endTime: this.endTime,
      passenger: this.adults + ',' + this.children + ',' + this.baby
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
        this.departureTime = item.flightDate;
      }
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
