import { configureStore } from "@reduxjs/toolkit";
import rooms from "redux/slices/roomsSlice";
import locations from "redux/slices/locationsSlice";

const store = configureStore({
  reducer: {
    rooms,
    locations,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
