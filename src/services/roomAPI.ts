import { GetRoomParams, Room } from "interfaces/room";
import axiosConfig from "./axiosConfig";

const roomAPI = {
  getRoomListByLocation: (locationId: GetRoomParams) => {
    return axiosConfig.get<unknown, Room[]>("rooms", { params: { locationId } });
  },
};

export default roomAPI;
