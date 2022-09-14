import axiosConfig from "./axiosConfig";
import { Review } from "interfaces/review";
import { Room, RoomAPIParams } from "interfaces/room";

const reviewAPI = {
  getReviewsByRoomId: (roomId: Room["_id"]) => {
    return axiosConfig.get("reviews/byRoom", { params: { roomId: roomId } });
  },
};

export default reviewAPI;
