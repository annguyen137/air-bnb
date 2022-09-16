import axiosConfig from "./axiosConfig";
import { Review, ReviewQueryParams } from "interfaces/review";

const reviewAPI = {
  getReviewsByRoomId: ({ roomId }: ReviewQueryParams) => {
    return axiosConfig.get<unknown, Review[]>("reviews/byRoom", { params: { roomId: roomId } });
  },
  getReviewDetail: ({ reviewId }: ReviewQueryParams) => {
    return axiosConfig.get<unknown, Review>(`reviews/${reviewId}`);
  },
};

export default reviewAPI;
