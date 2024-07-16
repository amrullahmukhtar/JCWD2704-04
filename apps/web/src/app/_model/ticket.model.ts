export type TTicket = {
  id: number;
  movieId: string;
  seatId: number;
  time: string;
  price: number;
  transactionId?: number;
};
