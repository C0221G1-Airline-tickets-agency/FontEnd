import {Airline} from './Airline';

export interface Flight {
  flightId: number;
  flightCode: string;
  flightDate: string;
  departureTime: string;
  endTime: string;
  flightPrice: string;
  flag: boolean;
  airline: Airline;
  locationTo: Location;
  locationFrom: Location;
}
