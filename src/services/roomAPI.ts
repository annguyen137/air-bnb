import axiosConfig from "./axiosConfig";
import { RoomAPIParams, Room } from "interfaces/room";

const roomAPI = {
  getRoomListByLocation: (locationId?: RoomAPIParams) => {
    return axiosConfig.get<unknown, Room[]>("rooms", { params: { locationId: locationId } });
  },
};

export default roomAPI;
