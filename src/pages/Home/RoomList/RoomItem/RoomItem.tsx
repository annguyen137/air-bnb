import React from "react";
import { Box } from "@mui/material";
import { Room } from "interfaces/room";

import styles from "./RoomItem.module.scss";

interface Props {
  room: Room;
}

const RoomItem = ({ room }: Props) => {
  return (
    <Box className={`${styles["room-card"]}`}>
      <img src={room.image} alt="" className={`${styles["room-img"]}`} />
      <p className="font-bold">{room.name}</p>
      <p>
        <span className="font-bold">${room.price}</span> đêm
      </p>
    </Box>
  );
};

export default RoomItem;
