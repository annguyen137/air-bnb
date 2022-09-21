import { Moment, MomentBuiltinFormat, MomentCreationData } from "moment";
import { User } from "./user";

export interface LoginValue {
  email: string;
  password: string;
  isRemember?: boolean;
}

export interface SignUpValue {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: Date;
  gender: boolean;
  address: string;
}

export interface LoginPayload {
  message?: string;
  token?: string;
  user?: User;
}
