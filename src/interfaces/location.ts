import { Pagination } from "./pagination";
import { Review } from "./review";

export interface LocationId {
  deleteAt: boolean;
  _id: string;
  name: string;
  province: string;
  country: string;
  valueate: number;
  __v: number;
  image: string;
}

export interface LocationBodyValue {
  name: LocationId["name"];
  province: LocationId["province"];
  country: LocationId["country"];
  valueate: LocationId["valueate"];
}

export interface UpdateLocationImageValue {
  location: File;
}

export interface LocationQueryParams extends Pagination {
  location?: string;
  valueate?: number;
}
