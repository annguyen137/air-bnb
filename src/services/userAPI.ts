import { UpdateInfoValue, User } from "interfaces/user";
import { string } from "yup/lib/locale";
import axiosConfig from "./axiosConfig";

const userAPI = {
  addUser: () => {},

  getUserDetail: (userId: User["_id"]) => {
    return axiosConfig.get<unknown, User>(`/users/${userId}`);
  },

  updateUserAvatar: (formData: FormData) => {
    return axiosConfig.post<unknown, User>("users/upload-avatar", formData);
  },

  updateUserInfo: (userId: User["_id"], value: UpdateInfoValue) => {
    return axiosConfig.put<unknown, { message: string; userDetail: User }>(`users/${userId}`, value, {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
      },
    });
  },
};

export default userAPI;
