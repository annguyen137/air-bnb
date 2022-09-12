import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Room } from "interfaces/room";
import { Box, Container } from "@mui/material";
import { getRoomDetail } from "redux/slices/roomsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";

import styles from "./RoomDetail.module.scss";
import Loading from "components/Loading/Loading";

const RoomDetail = () => {
  const { roomId } = useParams() as { roomId: Room["_id"] };

  const dispatch = useDispatch<AppDispatch>();

  const { roomDetail, isLoading } = useSelector((state: RootState) => state.rooms);

  useEffect(() => {
    dispatch(getRoomDetail(roomId));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box>
      <Container>
        <p>Room Detail</p>
        <Box className={`${styles["room-detail"]}`}>
          <Box>
            <img src={roomDetail.image} alt={roomDetail.name} />
          </Box>
          <Box>
            <p>{roomDetail.name}</p>
            <p>{roomDetail.price}</p>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default RoomDetail;
