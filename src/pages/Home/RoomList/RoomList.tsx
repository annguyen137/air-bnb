import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { getLocationList } from "redux/slices/locationsSlice";
import { getRoomListByLocation } from "redux/slices/roomsSlice";
import { RootState, AppDispatch } from "redux/store";
import RoomItem from "./RoomItem/RoomItem";

const RoomList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { roomsData, error, isLoading } = useSelector((state: RootState) => state.rooms);

  useEffect(() => {
    dispatch(getLocationList());
    dispatch(getRoomListByLocation());
  }, []);

  return (
    <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xl: 10 }}>
      {roomsData.map((room) => {
        return (
          <Grid item key={room._id} xs={6} md={4} lg={3} xl={2}>
            <RoomItem room={room} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default RoomList;
