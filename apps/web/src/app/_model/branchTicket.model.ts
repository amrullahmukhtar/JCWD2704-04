import { TTicket } from "./ticket.model";

export type TBranchTicket = {
  id: number;
  branchId: number;
  studioName: string;
  branch: {
    id: number;
    location: string;
  };
  seats: {
    id: number;
    studioId: number;
    row: string;
    number: number;
    ticket: TTicket[];
  }[];
};
