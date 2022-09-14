import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Review } from "interfaces/review";
import { Room, RoomAPIParams } from "interfaces/room";
import reviewAPI from "services/reviewAPI";

interface ReviewState {
  reviewsByRoomId: Review[];
  isLoading: boolean;
  error: string;
}

const initialState: ReviewState = {
  reviewsByRoomId: [],
  isLoading: false,
  error: "",
};

export const getReviewsByRoomId = createAsyncThunk("reviews/getReviewsByRoomId", async (roomId: Room["_id"]) => {
  try {
    const { data } = await reviewAPI.getReviewsByRoomId(roomId);
    return data;
  } catch (error) {
    throw error;
  }
});

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReviewsByRoomId.pending, (state) => ({ ...state, isLoading: true }));

    builder.addCase(getReviewsByRoomId.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      reviewsByRoomId: payload,
    }));
  },
});

export default reviewsSlice.reducer;
