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
      // TEST
      // const test = payload.map((item) => {
      //   if (item.roomId === null) {
      //     return item;
      //   } else if (item.roomId && typeof item.roomId.locationId === "string") {
      //     return (async () => {
      //       try {
      //         const locationid = item.roomId?.locationId as string;
      //         const data = await locationAPI.getLocationDetail(locationid);
      //         // console.log({
      //         //   ...item,
      //         //   roomId: { ...item.roomId, locationId: { ...data } },
      //         // } as Ticket);

      //         return {
      //           ...item,
      //           roomId: { ...item.roomId, locationId: { ...data } },
      //         } as Ticket;
      //       } catch (error) {
      //         throw error;
      //       }
      //     })();
      //   }
      //   // return item;
      // });

      // return {
      //   ...state,
      //   isTicketLoading: false,
      //   ticketsByUser: test as Ticket[],
      // };
      return { ...state, isTicketLoading: false, ticketsByUser: payload };
    });
    builder.addCase(getTicketsByUser.rejected, (state, { error }) => {
      return { ...state, isTicketLoading: false, ticketsByUser: [], error: error.message as string };
    });
  },
});

export default ticketsSlice.reducer;
