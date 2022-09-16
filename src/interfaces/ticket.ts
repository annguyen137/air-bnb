import { Room } from "./room";

export interface Ticket {
  deleteAt: boolean;
  _id: string;
  roomId: Room;
  checkIn: Date;
  checkOut: Date;
  userId: null;
  __v: number;
}
