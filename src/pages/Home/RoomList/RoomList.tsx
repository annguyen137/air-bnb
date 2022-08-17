import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLocationList } from "redux/slices/locationsSlice";
import { getRoomListByLocation } from "redux/slices/roomsSlice";
import { RootState, AppDispatch } from "redux/store";

const RoomList = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // dispatch(getRoomListByLocation());
    dispatch(getLocationList());
  }, []);

  return <div>RoomList</div>;
};

export default RoomList;
