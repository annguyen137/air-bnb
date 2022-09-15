import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RoomAPIParams, Room } from "interfaces/room";
import roomAPI from "services/roomAPI";

import { LIMIT } from "../../services/axiosConfig";

interface RoomsState {
  roomsData: Room[];
  roomsPagination: Room[];
  roomDetail: Room;
  isLoading: boolean;
  error: string;
}

const initialState: RoomsState = {
  roomsData: [],
  roomsPagination: new Array<Room>(LIMIT),
  roomDetail: {} as Room,
  isLoading: false,
  error: "",
};

export const getRoomListByLocation = createAsyncThunk(
  "rooms/getRoomListByLocation",
  async ({ locationId, limit, skip }: RoomAPIParams) => {
    try {
      const data = await roomAPI.getRoomListByLocation({ locationId, limit, skip });
      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const getRoomDetail = createAsyncThunk("rooms/getRoomDetail", async (roomId: Room["_id"]) => {
  try {
    const data = await roomAPI.getRoomDetail(roomId);
    return data;
  } catch (error) {
    throw error;
  }
});

const roomsSlice = createSlice({
  name: "rooms",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // room list
    builder.addCase(getRoomListByLocation.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getRoomListByLocation.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        roomsPagination: payload,
        roomsData: [...state.roomsData, ...payload] as Room[],
      };
    });
    builder.addCase(getRoomListByLocation.rejected, (state, { error }) => {
      return { ...state, isLoading: false, error: error.message as string };
    });

    // room detail
    builder.addCase(getRoomDetail.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getRoomDetail.fulfilled, (state, { payload }) => {
      return { ...state, isLoading: false, roomDetail: payload };
    });
    builder.addCase(getRoomDetail.rejected, (state, { error }) => {
      return { ...state, isLoading: false, error: error.message as string };
    });
  },
});

export default roomsSlice.reducer;
