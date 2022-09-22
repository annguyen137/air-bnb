import axiosConfig from "./axiosConfig";
import { Review, ReviewBodyValue, ReviewQueryParams } from "interfaces/review";
import { Room } from "interfaces/room";

const reviewAPI = {
  getReviewsByRoomId: ({ roomId }: ReviewQueryParams) => {
    return axiosConfig.get<unknown, Review[]>("reviews/byRoom", { params: { roomId: roomId } });
  },
  getReviewDetail: ({ reviewId }: ReviewQueryParams) => {
    return axiosConfig.get<unknown, Review>(`reviews/${reviewId}`);
  },
  postAReviewByRoomId: (roomId: ReviewQueryParams["roomId"], content: ReviewBodyValue["content"]) => {
    return axiosConfig.post<unknown, Review>(`reviews`, { content }, { params: { roomId } });
  },
};

export default reviewAPI;
