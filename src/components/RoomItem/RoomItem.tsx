import React from "react";
import { Box, Stack, Button } from "@mui/material";
import { Room } from "interfaces/room";
import { NavLink, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import styles from "./RoomItem.module.scss";

interface Props {
  room: Room;
}

const RoomItem = ({ room }: Props) => {
  const navigate = useNavigate();

  return (
    <Box className={`${styles["room-card"]}`}>
      <Box>
        <Box className={`${styles["room-img"]}`}>
          <NavLink to={`/rooms/${room._id}`} target={"_blank"}>
            <img src={`${room.image}`} alt={room.name} />
          </NavLink>

          <Box className={`${styles["overlay"]}`}>
            <Stack rowGap={"5px"}>
              <Box>
                <Stack direction={"row"} gap={3} alignItems="center" justifyContent={"space-between"}>
                  <span>Bed Rooms</span>
                  <span>{room.bedRoom}</span>
                </Stack>
              </Box>
              <Box>
                <Stack direction={"row"} gap={3} alignItems="center" justifyContent={"space-between"}>
                  <span>Guest</span>
                  <span>{room.guests}</span>
                </Stack>
              </Box>
              <Box>
                <Stack direction={"row"} gap={3} alignItems="center" justifyContent={"space-between"}>
                  <span>Wifi</span>
                  <span>
                    {room.wifi ? (
                      <CheckCircleIcon fontSize="small" color="success" />
                    ) : (
                      <HighlightOffIcon fontSize="small" color="error" />
                    )}
                  </span>
                </Stack>
              </Box>
              <Box>
                <Stack direction={"row"} gap={3} alignItems="center" justifyContent={"space-between"}>
                  <span>Pool</span>
                  <span>
                    {room.pool ? (
                      <CheckCircleIcon fontSize="small" color="success" />
                    ) : (
                      <HighlightOffIcon fontSize="small" color="error" />
                    )}
                  </span>
                </Stack>
              </Box>
              <Box>
                <Stack direction={"row"} gap={3} alignItems="center" justifyContent={"space-between"}>
                  <span>Gym</span>
                  <span>
                    {room.gym ? (
                      <CheckCircleIcon fontSize="small" color="success" />
                    ) : (
                      <HighlightOffIcon fontSize="small" color="error" />
                    )}
                  </span>
                </Stack>
              </Box>
              <Box>
                <Stack direction={"row"} gap={3} alignItems="center" justifyContent={"space-between"}>
                  <span>Elevator</span>
                  <span>
                    {room.elevator ? (
                      <CheckCircleIcon fontSize="small" color="success" />
                    ) : (
                      <HighlightOffIcon fontSize="small" color="error" />
                    )}
                  </span>
                </Stack>
              </Box>
              <Box>
                <span>More...</span>
              </Box>
            </Stack>
            <Box>
              <NavLink to={`/rooms/${room._id}`} target={"_blank"}>
                <Button className={`${styles["book-button"]}`}>Book now</Button>
              </NavLink>
            </Box>
          </Box>
        </Box>
        <NavLink to={`/rooms/${room._id}`} target={"_blank"}>
          <Box>
            <h4 className={`${styles["room-name"]}`}>{room.name}</h4>
            <p className={`${styles["room-price"]}`}>
              <span>${room.price}</span> đêm
            </p>
          </Box>
        </NavLink>
      </Box>

      <FavoriteIcon className={styles["favourite"]} />
    </Box>
  );
};

export default RoomItem;
