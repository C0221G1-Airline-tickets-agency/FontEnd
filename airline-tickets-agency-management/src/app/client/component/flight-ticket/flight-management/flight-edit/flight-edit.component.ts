import {Component, Inject, OnInit} from '@angular/core';
import {FlightService} from "../../../service/flight.service";
import {LocationService} from "../../../service/location.service";
import {AirlineService} from "../../../service/airline.service";
import {Location} from "../../../model/location";
import {Airline} from "../../../model/airline";
import {Flight} from "../../../model/flight";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {gte} from "../../../gte.validator";

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnInit {

  locations : Location[] = [];
  airlines : Airline [] = [];
  flightObj : Flight;
  flightForm : FormGroup;

  constructor(private flightService: FlightService,private locationService : LocationService , private airlineService : AirlineService,
              public dialogRef: MatDialogRef<FlightEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.flightForm =  new FormGroup({
        flightId: new FormControl(this.data.flightId),
        flightCode: new FormControl(this.data.flightCode,[Validators.required]),
        flightDate: new FormControl(this.data.flightDate,[Validators.required,Validators.pattern(/^(19|20)?[0-9]{2}[- /.](0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])$/),gte]),
        departureTime: new FormControl(this.data.departureTime,[Validators.required,Validators.pattern(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)]),
        endTime: new FormControl(this.data.endTime,[Validators.required,Validators.pattern(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)]),
        flightPrice: new FormControl(this.data.flightPrice, [Validators.required]),
        airline: new FormControl(this.data.airline, [Validators.required]),
        locationTo : new FormControl(this.data.locationTo, [Validators.required]),
        locationFrom: new FormControl(this.data.locationFrom, [Validators.required])
      }
    )
  }

  ngOnInit(): void {
    this.getAllLocation();
    this.getAllAirline();

  }
  getAllLocation(){
    this.locationService.getAllLocation().subscribe(next =>{
      this.locations = next;
    })
  }

  getAllAirline(){
    this.airlineService.getAllAirline().subscribe(next =>{
      this.airlines = next;
    })
  }

  updateFlight() {
    this.flightObj = this.flightForm.value;
    this.flightService.updateFlight(this.flightObj.flightId, this.flightObj).subscribe();
  }

  compareFn(c1: Airline, c2: Airline): boolean {
    return c1 && c2 ? c1.airlineId === c2.airlineId : c1 === c2;
  }
  compareFn1(c1: Location, c2: Location): boolean {
    return c1 && c2 ? c1.locationId === c2.locationId: c1 === c2;
  }




  get flightCode(){
    return this.flightForm.get('flightCode')
  }
  get flightDate(){
    return this.flightForm.get('flightDate');
  }
  get departureTime(){
    return this.flightForm.get('departureTime');
  }
  get endTime(){
    return this.flightForm.get('endTime');
  }
  get flightPrice(){
    return this.flightForm.get('flightPrice')
  }
  get airline(){
    return this.flightForm.get('airline');
  }
  get locationTo(){
    return this.flightForm.get('locationTo');
  }
  get locationFrom(){
    return this.flightForm.get('locationFrom');
  }


}

