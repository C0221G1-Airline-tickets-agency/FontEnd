import {Airline} from './Airline';
import {Location} from './Location';

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
