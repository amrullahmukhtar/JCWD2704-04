import { TTicket } from "./ticket.model";
import { ISeat } from "./seat.model";

export interface ITicketWithSeat extends TTicket {
  seat: ISeat;
}

export interface ISeatWithTickets extends ISeat {
  tickets: TTicket[];
}
