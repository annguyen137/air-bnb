import { SignUpValue } from "./auth";
import { Ticket } from "./ticket";

//user
export interface User {
  tickets: Ticket["_id"][];
  deleteAt: boolean;
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: Date;
  gender: boolean;
  address: string;
  type: string;
  __v: number;
  avatar?: string;
}

// admin
export interface AddUserBodyValue extends SignUpValue {
  type: "ADMIN" | "CLIENT";
}

export interface UpdateUserAvatarValue {
  avatar: File;
}
