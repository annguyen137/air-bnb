import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { getLocationList } from "redux/slices/locationsSlice";
import { getRoomListByLocation } from "redux/slices/roomsSlice";
import { RootState, AppDispatch } from "redux/store";
import RoomItem from "components/RoomItem/RoomItem";

import styles from "./RoomList.module.scss";
import { Container } from "@mui/system";

const RoomList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { roomsData, error, isLoading } = useSelector((state: RootState) => state.rooms);

  useEffect(() => {
    dispatch(getLocationList());
    dispatch(getRoomListByLocation());
  }, []);

  return (
    <Box className="inner">
      <Container>
        <Box className={`${styles["room-list"]}`}>
          {roomsData.map((room) => {
            return (
              <Box key={room._id}>
                <RoomItem room={room} />
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default RoomList;
