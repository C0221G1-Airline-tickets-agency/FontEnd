import { Component, OnInit } from '@angular/core';
import {Flight} from '../../../../../model/flight-ticket/Flight';
import {FlightService} from '../../../../../service/flight-ticket/flight.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogDeleteComponent} from '../dialog-delete/dialog-delete.component';
import {DialogService} from '../../../../../service/dialog.service';

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
  constructor(private flightTicketService: FlightService,
              private matDialog: MatDialog,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getAll();
  }


  getAll() {
    this.flightTicketService.getAllFlight().subscribe(res => {
      this.flights = res;
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

    } else {
      this.dialogService.openConfirm(this.idFlight).afterClosed().subscribe(res => {
        if (res === true) {
          this.flightTicketService.getDeleteFlight(this.idFlight).subscribe(() => {
            this.ngOnInit();
          });
        }
      });

    }
  }

}
