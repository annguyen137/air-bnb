import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetRoomParams, Room } from "interfaces/room";
import roomAPI from "services/roomAPI";

interface RoomsState {
  data: Room[];
  isLoading: boolean;
  error: string;
}

const initialState: RoomsState = {
  data: [],
  isLoading: false,
  error: "",
};

export const getRoomListByLocation = createAsyncThunk(
  "rooms/getRoomListByLocation",
  async (locationId: GetRoomParams) => {
    try {
      const data = await roomAPI.getRoomListByLocation(locationId);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const roomsSlice = createSlice({
  name: "rooms",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoomListByLocation.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getRoomListByLocation.fulfilled, (state, { payload }) => {
      return { ...state, isLoading: false, data: payload };
    });
    builder.addCase(getRoomListByLocation.rejected, (state, { error }) => {
      return { ...state, isLoading: false, error: error.message as string };
    });
  },
});

export default roomsSlice.reducer;
