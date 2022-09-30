import { configureStore } from "@reduxjs/toolkit";
import axiosConfig, { setUpAxiosIntercepters } from "services/axiosConfig";
import all from "redux/slices/fetchAllSlice";
import rooms from "redux/slices/roomsSlice";
import locations from "redux/slices/locationsSlice";
import review from "redux/slices/reviewsSlice";
import auth from "redux/slices/authSlice";
import user from "redux/slices/userSlice";
import ticket from "redux/slices/ticketsSlice";

const store = configureStore({
  reducer: {
    all,
    rooms,
    locations,
    review,
    auth,
    user,
    ticket,
  },
  devTools: process.env.NODE_ENV !== "production",
});

setUpAxiosIntercepters(store, axiosConfig);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
