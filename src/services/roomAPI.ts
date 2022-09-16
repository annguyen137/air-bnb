import axiosConfig from "./axiosConfig";
import { RoomQueryParams, Room } from "interfaces/room";

const roomAPI = {
  getRoomListByLocation: ({ locationId, limit, skip }: RoomQueryParams) => {
    return axiosConfig.get<unknown, Room[]>("rooms", { params: { locationId: locationId, limit: limit, skip: skip } });
  },
  getRoomDetail: ({ roomId }: RoomQueryParams) => {
    return axiosConfig.get<unknown, Room>(`rooms/${roomId}`);
  },
};

export default roomAPI;
