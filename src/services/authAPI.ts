import { LoginPayload, LoginValue, SignUpValue } from "interfaces/auth";
import { User } from "interfaces/user";
import axiosConfig from "./axiosConfig";

const authAPI = {
  login: ({ email, password }: LoginValue) => {
    return axiosConfig.post<unknown, LoginPayload>("auth/login", { email, password });
  },

  signup: (signUpValue: SignUpValue) => {
    return axiosConfig.post<unknown, User>("auth/register", signUpValue);
  },
};

export default authAPI;
