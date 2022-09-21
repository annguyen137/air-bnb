import { User } from "interfaces/user";
import axiosConfig from "./axiosConfig";

const userAPI = {
  addUser: () => {},

  getUserDetail: (userId: User["_id"]) => {
    return axiosConfig.get<unknown, User>(`/users/${userId}`);
  },
};

export default userAPI;
