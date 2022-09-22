import React from "react";
import { Box, Stack, Button, Typography } from "@mui/material";
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
      <Stack sx={{ height: "100%" }}>
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
        <NavLink to={`/rooms/${room._id}`} target={"_blank"} style={{ flexGrow: 1 }}>
          <Stack justifyContent={"space-between"} sx={{ height: "100%" }}>
            <h4 className={`${styles["room-name"]}`}>{room.name}</h4>
            <Typography variant="body2">
              {room.locationId?.name}, {room.locationId?.province}, {room.locationId?.country}
            </Typography>
            <p className={`${styles["room-price"]}`}>
              <span>${room.price}</span> đêm
            </p>
          </Stack>
        </NavLink>
      </Stack>

      <FavoriteIcon className={styles["favourite"]} />
    </Box>
  );
};

export default RoomItem;
