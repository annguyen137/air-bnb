import axiosConfig from "./axiosConfig";
import { RoomAPIParams, Room } from "interfaces/room";

const roomAPI = {
  getRoomListByLocation: ({ locationId, limit }: RoomAPIParams) => {
    return axiosConfig.get<unknown, Room[]>("rooms", { params: { locationId: locationId, limit: limit } });
  },
  getRoomDetail: (roomId: Room["_id"]) => {
    return axiosConfig.get<unknown, Room>(`rooms/${roomId}`);
  },
};

export default roomAPI;
