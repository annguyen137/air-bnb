import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocationList } from "redux/slices/locationsSlice";
import { getRoomListByLocation } from "redux/slices/roomsSlice";
import { RootState, AppDispatch } from "redux/store";

const RoomList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { roomsData, error, isLoading } = useSelector((state: RootState) => state.rooms);

  useEffect(() => {
    dispatch(getLocationList());
    dispatch(getRoomListByLocation());
  }, []);

  return (
    <div>
      {roomsData.map((room) => {
        return <p key={room._id}>{room.name}</p>;
      })}
    </div>
  );
};

export default RoomList;
