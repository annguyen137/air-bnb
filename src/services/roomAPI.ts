import axiosConfig from "./axiosConfig";
import { RoomAPIParams, Room } from "interfaces/room";

const roomAPI = {
  getRoomListByLocation: ({ locationId, limit, skip }: RoomAPIParams) => {
    return axiosConfig.get<unknown, Room[]>("rooms", { params: { locationId: locationId, limit: limit, skip: skip } });
  },
  getRoomDetail: (roomId: Room["_id"]) => {
    return axiosConfig.get<unknown, Room>(`rooms/${roomId}`);
  },
};

export default roomAPI;
