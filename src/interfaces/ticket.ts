import { Pagination } from "./pagination";
import { Room } from "./room";
import { User } from "./user";

export interface Ticket {
  deleteAt: boolean;
  _id: string;
  roomId: Room | Partial<Room>;
  checkIn: Date;
  checkOut: Date;
  userId: null | User;
  __v: number;
}

export interface BookTicket {
  roomId: Room["_id"];
  checkIn: string;
  checkOut: string;
}

export interface TicketQueryParams extends Pagination {
  roomId?: Room["_id"];
  userId?: User["_id"];
}
