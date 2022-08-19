import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
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
    <Grid container spacing={{ md: 2 }}>
      {roomsData.map((room) => {
        return (
          <Grid item key={room._id} md={3}>
            <Box>
              <img src={room.image} alt="" className="max-w-full" />
              <p>{room.name}</p>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default RoomList;
