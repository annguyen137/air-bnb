import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Review, ReviewQueryParams } from "interfaces/review";
import { Room } from "interfaces/room";
import reviewAPI from "services/reviewAPI";

interface ReviewState {
  reviewsByRoomId: Review[];
  isReviewsLoading: boolean;
  reviewDetail: Review;
  isReviewDetailLoading: boolean;
  error: string;
}

const initialState: ReviewState = {
  reviewsByRoomId: [],
  isReviewsLoading: false,
  reviewDetail: {} as Review,
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

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: initialState,
  reducers: {
    resetReviewState: (state) => {
      return { ...state, ...initialState };
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
  },
});

export default reviewsSlice.reducer;

export const { resetReviewState } = reviewsSlice.actions;
