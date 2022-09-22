import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Review, ReviewBodyValue, ReviewQueryParams } from "interfaces/review";
import { Room } from "interfaces/room";
import reviewAPI from "services/reviewAPI";
import { toast } from "react-toastify";

interface ReviewState {
  reviewsByRoomId: Review[];
  isReviewsLoading: boolean;
  reviewDetail: Review;
  isReviewDetailLoading: boolean;
  reviewActionSuccess: boolean;
  error: string;
}

const initialState: ReviewState = {
  reviewsByRoomId: [],
  isReviewsLoading: false,
  reviewDetail: {} as Review,
  reviewActionSuccess: false,
  isReviewDetailLoading: false,
  error: "",
};

export const getReviewsByRoomId = createAsyncThunk(
  "reviews/getReviewsByRoomId",
  async ({ roomId }: ReviewQueryParams) => {
    try {
      const data = await reviewAPI.getReviewsByRoomId({ roomId });
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getReviewDetail = createAsyncThunk("reviews/getReviewDetail", async ({ reviewId }: ReviewQueryParams) => {
  try {
    const data = await reviewAPI.getReviewDetail({ reviewId });
    return data;
  } catch (error) {
    throw error;
  }
});

export const postAReviewByRoomId = createAsyncThunk(
  "reviews/postAReviewByRoomId",
  async ({ roomId, content }: { roomId: ReviewQueryParams["roomId"]; content: ReviewBodyValue["content"] }) => {
    try {
      const data = await reviewAPI.postAReviewByRoomId(roomId, content);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: initialState,
  reducers: {
    resetReviewState: (state) => {
      return { ...state, ...initialState };
    },
    resetReviewAction: (state) => {
      return { ...state, reviewActionSuccess: false };
    },
  },
  extraReducers: (builder) => {
    // reviews by room
    builder.addCase(getReviewsByRoomId.pending, (state) => ({ ...state, isReviewsLoading: true }));

    builder.addCase(getReviewsByRoomId.fulfilled, (state, { payload }) => ({
      ...state,
      isReviewsLoading: false,
      reviewsByRoomId: payload,
    }));

    builder.addCase(getReviewsByRoomId.rejected, (state, { error }) => ({
      ...state,
      isReviewsLoading: false,
      error: error as string,
    }));

    // review detail
    builder.addCase(getReviewDetail.pending, (state) => ({ ...state, isReviewDetailLoading: true }));
    builder.addCase(getReviewDetail.fulfilled, (state, { payload }) => ({
      ...state,
      isReviewDetailLoading: false,
      reviewDetail: payload,
    }));
    builder.addCase(getReviewDetail.rejected, (state, { error }) => ({
      ...state,
      isReviewDetailLoading: false,
      error: error.message as string,
    }));

    // post review
    builder.addCase(postAReviewByRoomId.fulfilled, (state) => {
      toast.success("Success posting your review!", { isLoading: false, autoClose: 1000, pauseOnHover: true });
      return { ...state, reviewActionSuccess: true };
    });
    builder.addCase(postAReviewByRoomId.rejected, (state) => {
      toast.error("Fail to post your review!", { isLoading: false, autoClose: 1000, pauseOnHover: true });
      return { ...state, reviewActionSuccess: false };
    });
  },
});

export default reviewsSlice.reducer;

export const { resetReviewState, resetReviewAction } = reviewsSlice.actions;
