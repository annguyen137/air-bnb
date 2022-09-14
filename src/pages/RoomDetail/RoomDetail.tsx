import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Room, RoomAPIParams } from "interfaces/room";
import { Box, Container } from "@mui/material";
import WavesIcon from "@mui/icons-material/Waves";
import { getRoomDetail } from "redux/slices/roomsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import Loading from "components/Loading/Loading";

import styles from "./RoomDetail.module.scss";

const RoomDetail: React.FC = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const ticketRef = useRef<HTMLElement>();

  const { roomId } = useParams() as { roomId: Room["_id"] };

  const dispatch = useDispatch<AppDispatch>();

  const { roomDetail, isLoading } = useSelector((state: RootState) => state.rooms);

  useEffect(() => {
    dispatch(getRoomDetail(roomId));

    window.onscroll = () => {
      if (window.scrollY >= 300) {
        ticketRef.current?.classList.add(styles["--sticky-ticket"]);
      } else if (window.scrollY >= 1000 || window.scrollY < 300) {
        ticketRef.current?.classList.remove(styles["--sticky-ticket"]);
      }
    };
  }, []);

  return (
    <Box sx={{ marginTop: "25px" }}>
      <Container>
        <Box className={`${styles["detail"]}`}>
          <Box className={`${styles["detail-title"]}`}>
            {isLoading ? <Loading width={300} /> : <h1>{roomDetail.name}</h1>}
          </Box>
          <Box className={`${styles["detail-content"]}`}>
            <Box className={`${styles["img"]}`}>
              {isLoading ? <Loading /> : <img src={roomDetail.image} alt={roomDetail.name} title={roomDetail.name} />}
            </Box>
            <Box className={`${styles["ticket"]}`}>
              <Box className={`${styles["book-ticket"]}`} ref={ticketRef}>
                <Box className={`${styles["ticket-inner"]}`}>
                  <Box>
                    <Box className={`${styles["price"]}`}>
                      <span>${roomDetail.price}</span>
                      <span>night</span>
                    </Box>
                    <Box className={`${styles["date-guest"]}`}></Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={`${styles["detail-info"]}`}>
            <Box className={`${styles["info"]}`}>
              <h3 className="title --secondary-title">What this place offers</h3>
              <Box className={`${styles["offers-list"]}`}>
                <Box className={`${styles["offer-item"]}`}>
                  <WavesIcon />
                  <span>Beach access – Beachfront</span>
                </Box>
              </Box>
            </Box>
            <Box className={`${styles["offers"]}`}>
              <h3 className="title --secondary-title">What this place offers</h3>
              <Box className={`${styles["offers-list"]}`}>
                <Box className={`${styles["offer-item"]}`}>
                  <WavesIcon />
                  <span>Beach access – Beachfront</span>
                </Box>
              </Box>
            </Box>
            <Box className={`${styles["reviews"]}`}></Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default RoomDetail;
