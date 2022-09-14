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

const RoomList: React.FC = () => {
  const triggerRef = useRef<IntersectionObserver>();

  const [isTriggered, setIsTriggered] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { roomsData, isLoading } = useSelector((state: RootState) => state.rooms);

  useEffect(() => {
    // dispatch(getLocationList());
    // dispatch(getRoomListByLocation({ limit: LIMIT }));

    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        const triggerDiv = entries[0];
        if (triggerDiv.isIntersecting) {
          setIsTriggered(triggerDiv.isIntersecting);
        }
      },
      { threshold: 1 }
    );

    // observer.observe(triggerRef.current);
  }, []);

  // LAZY LOAD FETCH USING INTERSECTION OBSERVER
  useEffect(() => {
    if (isTriggered) {
      dispatch(getRoomListByLocation({ limit: LIMIT }));
    }
  }, [isTriggered]);

  return (
    <Box sx={{ marginTop: "25px" }}>
      <Container>
        <Box className={`${styles["room-list"]}`}>
          {isLoading && [...Array(15)].map((item, index) => <Loading key={index} variant="card" />)}
          {roomsData.map((room, index) => (
            <Box key={index}>
              <RoomItem room={room} />
            </Box>
          ))}
        </Box>
        <Box ref={triggerRef}></Box>
      </Container>
    </Box>
  );
};

export default RoomList;
