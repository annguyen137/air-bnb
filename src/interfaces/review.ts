import { Room } from "./room";
import { User } from "./user";

export interface Review {
  deleteAt: boolean;
  _id: string;
  content: string;
  roomId: Room;
  userId: null | User;
  created_at: Date;
  updatedAt: Date;
  __v: number;
}
