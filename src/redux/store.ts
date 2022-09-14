import { configureStore } from "@reduxjs/toolkit";
import rooms from "redux/slices/roomsSlice";
import locations from "redux/slices/locationsSlice";
import review from "redux/slices/reviewsSlice";

const store = configureStore({
  reducer: {
    rooms,
    locations,
    review,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
