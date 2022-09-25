import { createSlice } from "@reduxjs/toolkit";
import ticketAPI from "services/ticketAPI";

interface TicketState {}

const initialState: TicketState = {};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
