import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LocationId } from "interfaces/location";
import { Room } from "interfaces/room";
import { Ticket } from "interfaces/ticket";
import { User } from "interfaces/user";
import locationAPI from "services/locationAPI";
import ticketAPI from "services/ticketAPI";

interface TicketState {
  ticketsByUser: Ticket[];
  ticketDetail: Ticket;
  isTicketLoading: boolean;
  error: string;
}

const initialState: TicketState = {
  ticketsByUser: [],
  ticketDetail: {} as Ticket,
  isTicketLoading: false,
  error: "",
};

export const getTicketsByUser = createAsyncThunk(
  "tickets/getTicketsByUser",
  async ({ userId }: { userId: User["_id"] }, { dispatch }) => {
    try {
      const data = await ticketAPI.getTicketsByUser({ userId });

      // TEST
      // data.map((item) => {
      //   if (item.roomId === null) {
      //     return item;
      //   } else if (typeof item.roomId.locationId === "string") {
      //     (async () => {
      //       try {
      //         const locationid = item.roomId?.locationId as string;

      //         const data = await locationAPI.getLocationDetail(locationid);
      //         const temp = {
      //           ...item,
      //           roomId: { ...item.roomId, locationId: data as LocationId } as Partial<Room>,
      //         } as Ticket;
      //         console.log(temp);
      //         return temp;
      //       } catch (error) {
      //         throw error;
      //       }
      //     })();
      //   }
      // }) as Ticket[];

      return data;
    } catch (error) {
      throw error;
    }
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTicketsByUser.pending, (state) => {
      return { ...state, isTicketLoading: true };
    });
    builder.addCase(getTicketsByUser.fulfilled, (state, { payload }) => {
      console.log(payload);
      return { ...state, isTicketLoading: false, ticketsByUser: payload };
    });
    builder.addCase(getTicketsByUser.rejected, (state, { error }) => {
      return { ...state, isTicketLoading: false, ticketsByUser: [], error: error.message as string };
    });
  },
});

export default ticketsSlice.reducer;
