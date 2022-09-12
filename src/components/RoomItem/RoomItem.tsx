import React from "react";
import { Box } from "@mui/material";
import { Room } from "interfaces/room";

import styles from "./RoomItem.module.scss";
import { NavLink } from "react-router-dom";

interface Props {
  room: Room;
}

const RoomItem = ({ room }: Props) => {
  return (
    <NavLink to={`/rooms/${room._id}`}>
      <Box className={`${styles["room-card"]}`}>
        <Box className={`${styles["room-img"]}`}>
          <img src={room.image} alt="" />
        </Box>
        <p className={`${styles["room-name"]}`}>{room.name}</p>
        <p className={`${styles["room-price"]}`}>
          <span>${room.price}</span> đêm
        </p>
      </Box>
    </NavLink>
  );
};

export default RoomItem;
