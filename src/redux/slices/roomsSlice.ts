import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RoomQueryParams, Room } from "interfaces/room";
import roomAPI from "services/roomAPI";

import { LIMIT } from "../../services/axiosConfig";

interface RoomsState {
  // room list
  roomsData: Room[];
  roomsPagination: Room[];
  isRoomsLoading: boolean;
  // room detail
  roomDetail: Room;
  isDetailLoading: boolean;
  // error
  error: string;
}

const initialState: RoomsState = {
  roomsData: [],
  roomsPagination: new Array<Room>(LIMIT),
  isRoomsLoading: false,

  roomDetail: {} as Room,
  isDetailLoading: false,
  error: "",
};

export const getRoomListByLocation = createAsyncThunk(
  "rooms/getRoomListByLocation",
  async ({ locationId, limit, skip }: RoomQueryParams) => {
    try {
      const data = await roomAPI.getRoomListByLocation({ locationId, limit, skip });
      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const getRoomDetail = createAsyncThunk("rooms/getRoomDetail", async ({ roomId }: RoomQueryParams) => {
  try {
    const data = await roomAPI.getRoomDetail({ roomId });
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
      return { ...state, isRoomsLoading: true };
    });
    builder.addCase(getRoomListByLocation.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isRoomsLoading: false,
        roomsPagination: payload,
        roomsData: [...state.roomsData, ...payload],
      };
    });
    builder.addCase(getRoomListByLocation.rejected, (state, { error }) => {
      return { ...state, isRoomsLoading: false, error: error.message as string };
    });

    // room detail
    builder.addCase(getRoomDetail.pending, (state) => {
      return { ...state, isDetailLoading: true };
    });
    builder.addCase(getRoomDetail.fulfilled, (state, { payload }) => {
      return { ...state, isDetailLoading: false, roomDetail: payload };
    });
    builder.addCase(getRoomDetail.rejected, (state, { error }) => {
      return { ...state, isDetailLoading: false, error: error.message as string };
    });
  },
});

export default roomsSlice.reducer;
