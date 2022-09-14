import { Room } from "./room";

export interface Review {
  deleteAt: boolean;
  _id: string;
  content: string;
  roomId: Room;
  userId: null;
  created_at: Date;
  updatedAt: Date;
  __v: number;
}
