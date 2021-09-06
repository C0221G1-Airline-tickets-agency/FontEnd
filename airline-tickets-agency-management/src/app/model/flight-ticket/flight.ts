import {Airline} from "./airline";
import {Location} from "./location";

export interface Flight {
  flightId?: number;
  flightCode?: string;
  flightDate?: string;
  departureTime?: string;
  endTime?: string;
  flightPrice?: string;
  airline?: Airline;
  locationTo?: Location;
  locationFrom?: Location;
}
