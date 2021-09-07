import {Flight} from "./flight";
import {TicketStatus} from "./ticket-status";
import {Customer} from "./customer";

export interface Ticket {
  ticketId?: number;
  ticketCode?: string;
  plusBaby?: boolean;
  plusBaggage?: string;
  ticketType?: string;
  ticketTypePrice?: number;
  ticketPrice?: number;
  tax?: number;
  chairName?: string;
  bookingDate?: string;
  checkInBaggage?: number;
  carryOnBaggage?: number;
  passengerType?: string;
  passengerTypePrice?: number;
  passengerName?: string;
  passengerGender?: string;
  passengerPhone?: string;
  passengerIdCard?: string;
  passengerEmail?: string;
  flag?: boolean;
  flight?: Flight;
  ticketStatus?: TicketStatus;
  customer?: Customer;
}
