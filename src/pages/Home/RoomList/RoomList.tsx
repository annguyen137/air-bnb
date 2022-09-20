import React, { useEffect, useRef, useState } from "react";
import styles from "./RoomList.module.scss";
import { Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getRoomListByLocation } from "redux/slices/roomsSlice";
import { RootState, AppDispatch } from "redux/store";
import RoomItem from "components/RoomItem/RoomItem";
import Loading from "components/Loading/Loading";
import { LIMIT } from "services/axiosConfig";
import useIntersectionObserver from "utils/useIntersectionObserver";

const RoomList: React.FC = () => {
  const triggerRef = useRef() as React.MutableRefObject<HTMLElement>;

  const dispatch = useDispatch<AppDispatch>();

  const [isTriggered, page, observer] = useIntersectionObserver();

  const { fetchAllLoading } = useSelector((state: RootState) => state.all);

  const { roomsData, roomsPagination, isRoomsLoading } = useSelector((state: RootState) => state.rooms);

  // PAGINATION FETCHING DATA USING INTERSECTION OBSERVER (CUSTOM HOOK)
  useEffect(() => {
    observer.observe(triggerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isTriggered && roomsPagination.length) {
      dispatch(getRoomListByLocation({ limit: LIMIT, skip: LIMIT * page }));
    }
  }, [isTriggered, page]);

  return (
    <Box sx={{ marginTop: "25px" }}>
      <Container>
        <Box className={`${styles["room-list"]}`}>
          {/* show loading at first load */}
          {fetchAllLoading && [...Array(LIMIT)].map((item, index) => <Loading key={index} variant="card" />)}
          {/*  */}
          {roomsData.map((room, index) => (
            <Box key={index}>
              <RoomItem room={room} />
            </Box>
          ))}
          {/*  */}
          {/* show loading next trigger load */}
          {isRoomsLoading && [...Array(LIMIT)].map((item, index) => <Loading key={index} variant="card" />)}
        </Box>
        <Box
          ref={triggerRef}
          sx={{
            padding: "25px 0",
            textAlign: "center",
          }}
        >
          {!roomsPagination.length ? "End of result" : ""}
        </Box>
      </Container>
    </Box>
  );
};

export default RoomList;
