import React, { useEffect, useRef, useState } from "react";
import { Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getLocationList } from "redux/slices/locationsSlice";
import { getRoomListByLocation } from "redux/slices/roomsSlice";
import { RootState, AppDispatch } from "redux/store";
import RoomItem from "components/RoomItem/RoomItem";
import Loading from "components/Loading/Loading";
import { LIMIT } from "services/axiosConfig";

import styles from "./RoomList.module.scss";
import useIntersectionObserver from "utils/useIntersectionObserver";
import useIsFirstLoad from "utils/useIsFirstLoad";

const RoomList: React.FC = () => {
  const triggerRef = useRef() as React.MutableRefObject<HTMLElement>;

  const dispatch = useDispatch<AppDispatch>();

  const [isFirstLoad, setIsFirstLoad] = useIsFirstLoad();

  const [isTriggered, page, observer] = useIntersectionObserver();

  const { roomsData, roomsPagination, isRoomsLoading } = useSelector((state: RootState) => state.rooms);

  // LAZY LOAD FETCH USING INTERSECTION OBSERVER (CUSTOM HOOK)
  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      dispatch(getLocationList());
      dispatch(getRoomListByLocation({ limit: LIMIT, skip: LIMIT * page }));
    }

    observer.observe(triggerRef.current);
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
          {roomsData.map((room, index) => (
            <Box key={index}>
              <RoomItem room={room} />
            </Box>
          ))}
          {isRoomsLoading && [...Array(LIMIT)].map((item, index) => <Loading key={index} variant="card" />)}
        </Box>
        <Box ref={triggerRef} sx={{ padding: "25px 0", textAlign: "center" }}>
          {!roomsPagination.length ? "End of result" : ""}
        </Box>
      </Container>
    </Box>
  );
};

export default RoomList;
