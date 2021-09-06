import {Component, OnInit} from '@angular/core';
import {Location} from "../../../model/location";
import {Airline} from "../../../model/airline";
import {LocationService} from "../../../service/location.service";
import {AirlineService} from "../../../service/airline.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Flight} from "../../../model/flight";
import {FlightService} from "../../../service/flight.service";
import {comparisonLocation, comparisonTime, gte} from "../../../gte.validator";


@Component({
  selector: 'app-flight-create',
  templateUrl: './flight-create.component.html',
  styleUrls: ['./flight-create.component.css']
})
export class FlightCreateComponent implements OnInit {
  locations: Location[] = [];
  airlines: Airline [] = [];
  flightObj: Flight;
  flightObj1: Flight;
  // flightId: number;
  // flightCode: string;
  // flightDate: string;
  // departureTime: string;
  // endTime: string;
  // flightPrice: string;
  // airline: Airline;
  // locationTo: Location;
  // locationFrom: Location;
  // flag?: boolean;


  public flightForm: FormGroup = new FormGroup({
      // flightId: new FormControl(''),
      // flightCode: new FormControl('',[Validators.required]),
      // flightDate: new FormControl('',[Validators.required,Validators.pattern(/^(19|20)?[0-9]{2}[- /.](0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])$/),gte]),
      // departureTime: new FormControl('',[Validators.required,Validators.pattern(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)]),
      // endTime: new FormControl('',[Validators.required,Validators.pattern(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)]),
      // flightPrice: new FormControl('', [Validators.required]),
      // airline: new FormControl('', [Validators.required]),
      // locationTo : new FormControl('', [Validators.required]),
      // locationFrom: new FormControl('', [Validators.required])

      flightId: new FormControl(''),
      flightCode: new FormControl('', [Validators.required]),
      flightDate: new FormControl('', [Validators.required, Validators.pattern(/^(19|20)?[0-9]{2}[- /.](0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])$/), gte]),
      timeGroup: new FormGroup({
        departureTime: new FormControl('', [Validators.required, Validators.pattern(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)]),
        endTime: new FormControl('', [Validators.required, Validators.pattern(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)]),
      }, comparisonTime),

      flightPrice: new FormControl('', [Validators.required]),
      airline: new FormControl('', [Validators.required]),
      locationGroup: new FormGroup({
        locationTo: new FormControl('', [Validators.required]),
        locationFrom: new FormControl('', [Validators.required])
      }, comparisonLocation)

    }
  )
  private flightS: Flight;


  constructor(private flightService: FlightService, private locationService: LocationService, private airlineService: AirlineService) {
  }

  ngOnInit(): void {
    this.getAllLocation();
    this.getAllAirline();

  }

  getAllLocation() {
    this.locationService.getAllLocation().subscribe(next => {
      this.locations = next;
    })
  }

  getAllAirline() {
    this.airlineService.getAllAirline().subscribe(next => {
      this.airlines = next;
    })
  }

  submit() {
    const flightObj1 = this.flightForm.value;

    const flightS: Flight =  {
      flightId : flightObj1.flightId,
      flightCode : flightObj1.flightCode,
      flightDate : flightObj1.flightDate,
      departureTime : flightObj1.timeGroup.departureTime,
      endTime : flightObj1.timeGroup.endTime,
      flightPrice : flightObj1.flightPrice,
      airline : flightObj1.airline,
      locationTo : flightObj1.locationGroup.locationTo,
      locationFrom : flightObj1.locationGroup.locationFrom
    }
    console.log(flightS);
    this.flightObj = flightS;
    this.flightService.saveFlight(this.flightObj).subscribe();
  }


  get flightCode() {
    return this.flightForm.get('flightCode')
  }

  get flightDate() {
    return this.flightForm.get('flightDate');
  }

  get departureTime() {
    return this.flightForm.get('departureTime');
  }

  get endTime() {
    return this.flightForm.get('endTime');
  }

  get flightPrice() {
    return this.flightForm.get('flightPrice')
  }

  get airline() {
    return this.flightForm.get('airline');
  }

  get locationTo() {
    return this.flightForm.get('locationTo');
  }

  get locationFrom() {
    return this.flightForm.get('locationFrom');
  }


}
