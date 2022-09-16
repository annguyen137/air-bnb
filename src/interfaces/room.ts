import { LocationId } from "./location";
import { Pagination } from "./pagination";
import { Ticket } from "./ticket";

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
  locationId: null | LocationId;
}

export interface RoomBodyValue {
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
  locationId: LocationId["_id"];
}

export interface BookRoomBodyValue {
  roomId: Room["_id"];
  checkIn: Ticket["checkIn"];
  checkOut: Ticket["checkOut"];
}

export interface UpdateRoomImageValue {
  room: File;
}
export interface RoomQueryParams extends Pagination {
  locationId?: LocationId["_id"];
  roomId?: Room["_id"];
}
