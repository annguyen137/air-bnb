import axiosConfig from "./axiosConfig";
import { RoomQueryParams, Room } from "interfaces/room";
import { User } from "interfaces/user";
import { string } from "yup";
import { BookTicket } from "interfaces/ticket";

const roomAPI = {
  getRoomListByLocation: ({ locationId, limit, skip }: RoomQueryParams) => {
    return axiosConfig.get<unknown, Room[]>("rooms", { params: { locationId: locationId, limit: limit, skip: skip } });
  },
  getRoomDetail: ({ roomId }: RoomQueryParams) => {
    return axiosConfig.get<unknown, Room>(`rooms/${roomId}`);
  },
  bookRoomById: (values: BookTicket) => {
    return axiosConfig.post<unknown, { message: string; userDetail: User }>(`rooms/booking`, values, {
      params: {
        roomId: values.roomId,
      },
    });
  },
};

export default roomAPI;
