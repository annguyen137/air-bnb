import { Box, Container, Stack } from "@mui/material";
import Loading from "components/Loading/Loading";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchAll } from "redux/slices/fetchAllSlice";
import { resetRoomState } from "redux/slices/roomsSlice";
import { AppDispatch, RootState } from "redux/store";
import CircularProgress from "@mui/material/CircularProgress";
import initFetch from "utils/initFetch";
import useIsFirstLoad from "utils/useIsFirstLoad";
import RoomItem from "components/RoomItem/RoomItem";

type Props = {};

const RoomListByLocation = (props: Props) => {
  window.scroll(0, 0);
  const { state } = useLocation() as { state: string };
  const dispatch = useDispatch<AppDispatch>();
  const { isFirstLoad, setIsFirstLoad } = useIsFirstLoad();

  const { user } = useSelector((state: RootState) => state.auth);

  const { roomsData, isRoomsLoading } = useSelector((state: RootState) => state.rooms);

  useEffect(() => {
    dispatch(fetchAll(initFetch(user, "roomsbylocation", undefined, state)));

    return () => {
      dispatch(resetRoomState());
    };
  }, [state]);

  if (isRoomsLoading) {
    return (
      <Box sx={{ width: "100%", minHeight: "100vh", position: "relative", display: "flex", flexGrow: 1 }}>
        <Container>
          <Box sx={{ paddingY: "25px" }}>
            <Stack direction={{ xs: "column", md: "row" }} gap={3}>
              <Box sx={{ width: { xs: "100%", sm: "70%" } }}>
                <Box sx={{ width: "100%" }}>
                  <Box>
                    <Loading width={300} />
                  </Box>
                  <Box
                    marginTop={2}
                    display={"grid"}
                    gap={"40px 24px"}
                    gridTemplateColumns={{ xs: "repeat(2,1fr)", sm: "repeat(2,1fr)" }}
                  >
                    {[...Array(6)].map((item, index) => (
                      <Loading variant="card" />
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: { xs: "hidden", sm: "flex" }, position: "relative", width: "100%" }}>
                <Loading css={{ height: "100%" }} />
                <CircularProgress
                  size={100}
                  thickness={5}
                  sx={{
                    color: "#ff385c",
                    position: "absolute",
                    top: "20%",
                    left: "50%",
                    transform: "translate(50%, -50%)",
                  }}
                />
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", position: "relative", display: "flex", flexGrow: 1 }}>
      <Container>
        <Box sx={{ paddingY: "25px" }}>
          <Stack direction={{ xs: "column", md: "row" }} gap={3}>
            <Box sx={{ width: "100%" }}>
              <Box>
                <h3>Rooms</h3>
              </Box>
              <Box
                display={"grid"}
                gap={"40px 24px"}
                gridTemplateColumns={{ xs: "repeat(2,1fr)", sm: "repeat(2,1fr)" }}
              >
                {roomsData.length ? (
                  roomsData.map((room, index) => (
                    <Box key={index}>
                      <RoomItem room={room} mode="roomsbylocation" />
                    </Box>
                  ))
                ) : (
                  <Box>
                    <p>No room found</p>
                  </Box>
                )}
              </Box>
            </Box>
            <Box sx={{ display: { xs: "hidden", sm: "flex" }, position: "relative", width: "100%" }}></Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default RoomListByLocation;
