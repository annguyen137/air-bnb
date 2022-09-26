import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RoomQueryParams, Room } from "interfaces/room";
import roomAPI from "services/roomAPI";
import { BookTicket } from "interfaces/ticket";
import { toast, ToastItem } from "react-toastify";

interface RoomsState {
  // room list
  roomsData: Room[];
  roomsPagination: Room[];
  isRoomsLoading: boolean;
  // room detail
  roomDetail: Room;
  isDetailLoading: boolean;
  // actions (booking, edit, update, delete,...)
  roomActionPending: boolean;
  roomActionSuccess: boolean;
  message: string;
  // error
  error: string;
}

const initialState: RoomsState = {
  roomsData: [],
  roomsPagination: [],
  isRoomsLoading: false,
  roomDetail: {} as Room,
  isDetailLoading: false,
  roomActionPending: false,
  roomActionSuccess: false,
  message: "",
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

export const bookRoomById = createAsyncThunk("rooms/bookRoomById", async (values: BookTicket) => {
  try {
    const data = await roomAPI.bookRoomById(values);
    return data;
  } catch (error) {
    throw error;
  }
});

let noti: ToastItem["id"];

const roomsSlice = createSlice({
  name: "rooms",
  initialState: initialState,
  reducers: {
    resetRoomState: (state) => {
      return {
        ...state,
        roomsData: [],
        roomsPagination: [],
        isRoomsLoading: false,
        roomDetail: {} as Room,
        isDetailLoading: false,
        error: "",
      };
    },
  },
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

    // book room by Id
    builder.addCase(bookRoomById.pending, (state) => {
      noti = toast.loading("Booking room...!");

      return { ...state, roomActionPending: true };
    });
    builder.addCase(bookRoomById.fulfilled, (state, { payload }) => {
      toast.update(noti, {
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: false,
        closeButton: true,
        render: payload.message,
      });

      return { ...state, roomActionPending: false, roomActionSuccess: true, message: payload.message };
    });
    builder.addCase(bookRoomById.rejected, (state, { error }) => {
      toast.update(noti, {
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: false,
        closeButton: true,
        render: error.message,
      });

      return { ...state, roomActionPending: false, roomActionSuccess: false, error: error.message as string };
    });
  },
});

export default roomsSlice.reducer;

export const { resetRoomState } = roomsSlice.actions;
