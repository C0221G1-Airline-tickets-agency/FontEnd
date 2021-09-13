import { Component, OnInit } from '@angular/core';
import {Airline} from "../../../../../model/flight-ticket/airline";
import {AirlineService} from "../../../../../service/flight-ticket/airline/airline.service";

@Component({
  selector: 'app-airline-list',
  templateUrl: './airline-list.component.html',
  styleUrls: ['./airline-list.component.css']
})
export class AirlineListComponent implements OnInit {

  airlines : Airline[] = [];

  constructor(private airlineService : AirlineService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.airlineService.getAllAirline().subscribe(next =>{
      this.airlines = next
    })
  }

}
