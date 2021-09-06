import {Airline} from './airline';
import {Location} from './location';

export interface Flight {
  flightId?: number;
  flightCode?: string;
  flightDate?: string;
  departureTime?: string;
  endTime?: string;
  flightPrice: number;
  flag?: boolean;
  airline?: Airline;
  locationTo?: Location ;
  locationFrom?: Location;
}
