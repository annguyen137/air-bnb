import { LocationId } from "./location";

export interface Room {
  deleteAt: boolean;
  _id: string;
  name: string;
  guests: number;
  bedRoom: number;
  bath: number;
  description: string;
  price: number;
  elevator: boolean;
  hotTub: boolean;
  pool: boolean;
  indoorFireplace: boolean;
  dryer: boolean;
  gym: boolean;
  kitchen: boolean;
  wifi: boolean;
  heating: boolean;
  cableTV: boolean;
  __v: number;
  image: string;
  locationId?: LocationId;
}

export interface RoomAPIParams {
  locationId?: LocationId["_id"];
  limit?: number;
  roomId?: string;
}
