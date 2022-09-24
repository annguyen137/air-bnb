import React, { useEffect, useRef, useState } from "react";
import styles from "./RoomList.module.scss";
import { Box, CircularProgress, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getRoomListByLocation, resetRoomState } from "redux/slices/roomsSlice";
import { RootState, AppDispatch } from "redux/store";
import RoomItem from "components/RoomItem/RoomItem";
import Loading from "components/Loading/Loading";
import { LIMIT } from "services/axiosConfig";
import useIntersectionObserver from "utils/useIntersectionObserver";
import { logoRef } from "components/Header/Header";
import { fetchAll, resetFetchAllStatus } from "redux/slices/fetchAllSlice";
import { resetLocationState } from "redux/slices/locationsSlice";
import initFetch from "utils/initFetch";

const RoomList: React.FC = () => {
  const triggerRef = useRef() as React.MutableRefObject<HTMLElement>;

  const dispatch = useDispatch<AppDispatch>();

  const [isTriggered, page, observer] = useIntersectionObserver();

  const { user } = useSelector((state: RootState) => state.auth);

  const { fetchAllLoading } = useSelector((state: RootState) => state.all);

  const { roomsData, roomsPagination, isRoomsLoading } = useSelector((state: RootState) => state.rooms);

  const reFetch = () => {
    window.scroll({ top: 0, behavior: "smooth" });

    if (window.top) {
      dispatch(resetFetchAllStatus());
      dispatch(resetRoomState());
      dispatch(getRoomListByLocation({ limit: LIMIT }));
      // dispatch(resetLocationState());
      //fetch but not refresh page
      // dispatch(fetchAll(initFetch(user, "home")));
    }
  };

  // PAGINATION FETCHING DATA USING INTERSECTION OBSERVER (CUSTOM HOOK)
  useEffect(() => {
    logoRef.current?.addEventListener("click", reFetch);

    observer.observe(triggerRef.current);

    return () => {
      observer.disconnect();
      logoRef.current?.removeEventListener("click", reFetch);
    };
  }, []);

  useEffect(() => {
    if (isTriggered && roomsPagination.length) {
      dispatch(getRoomListByLocation({ limit: LIMIT, skip: LIMIT * page }));
    }
  }, [isTriggered, page]);

  return (
    <Box sx={{ marginTop: "25px" }}>
      {isRoomsLoading && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "10px",
            zIndex: 10,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          size={50}
          thickness={7}
        />
      )}
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
