import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Container, Pagination, Stack, Typography } from "@mui/material";
import Loading from "components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchAll } from "redux/slices/fetchAllSlice";
import { getRoomListByLocation, resetRoomState } from "redux/slices/roomsSlice";
import { AppDispatch, RootState } from "redux/store";
import CircularProgress from "@mui/material/CircularProgress";
import HomeIcon from "@mui/icons-material/Home";
import ErrorIcon from "@mui/icons-material/Error";
import initFetch from "utils/initFetch";
import useIsFirstLoad from "utils/useIsFirstLoad";
import RoomItem from "components/RoomItem/RoomItem";
import { Room } from "interfaces/room";

type Props = {};

const RoomListByLocation = (props: Props) => {
  window.scroll({ top: 0, behavior: "smooth" });

  const dispatch = useDispatch<AppDispatch>();

  const { state } = useLocation() as { state: { _id: string; province: string; label: string } };

  const { isFirstLoad, setIsFirstLoad } = useIsFirstLoad();

  const { user } = useSelector((state: RootState) => state.auth);

  const { roomsData, isRoomsLoading } = useSelector((state: RootState) => state.rooms);

  const { fetchAllLoading } = useSelector((state: RootState) => state.all);

  const [page, setPage] = useState(1);

  const [paginationRooms, setPaginationRooms] = useState<Array<Room>>([]);

  const handleChangePage = (event: React.BaseSyntheticEvent, page: number) => {
    setPage(page);
    setPaginationRooms([...roomsData].slice((page - 1) * 4, (page - 1) * 4 + 4));
  };

  // IF FIRSTLOAD / REFRESH PAGE => CONDITIONAL DISPATCH ACTIONS / FETCH API
  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      if (state !== null && state._id) {
        dispatch(fetchAll(initFetch(user, "roomsbylocation", undefined, state._id)));
      }
    } else {
      if (state !== null && state._id) {
      }
      dispatch(getRoomListByLocation({ locationId: state._id }));
    }

    // CLEAN UP EVERY TIME CHOOSING NEW LOCATION AND PRESS FIND ROOM
    // => RESET CURRENT ROOMS STATE DATA AND SET NEW DATA FROM API
    return () => {
      dispatch(resetRoomState());
      setPaginationRooms([]);
      setPage(1);
    };
  }, [state]);

  // SET PAGINATION DATA AFTER SUCCESS FETCHING ROOMS BY LOCATION (LENGTH >=1)
  useEffect(() => {
    if (roomsData.length) {
      setPaginationRooms(roomsData.length >= 4 ? [...roomsData].slice(0, 4) : [...roomsData]);
    }
  }, [roomsData]);

  // loading
  if (isRoomsLoading || fetchAllLoading) {
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
                      <Loading key={index} variant="card" />
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
        <Box marginTop={1}>
          <Breadcrumbs>
            <Link to="/">
              <Stack direction={"row"} alignItems="center">
                <HomeIcon />
                <Typography fontWeight={"700"}>Home</Typography>
              </Stack>
            </Link>
            <p>Rooms by location</p>
          </Breadcrumbs>
        </Box>
        <Box sx={{ paddingY: "25px" }}>
          <Stack direction={{ xs: "column", md: "row" }} gap={3}>
            <Box sx={{ width: "100%" }}>
              {state !== null && state._id && (
                <Box marginBottom={2}>
                  <h3>Rooms by {`${state.province}`}</h3>
                </Box>
              )}
              {roomsData.length > 0 ? (
                <Box>
                  <Box
                    display={"grid"}
                    gap={"40px 24px"}
                    gridTemplateColumns={{ xs: "repeat(2,1fr)", sm: "repeat(2,1fr)" }}
                  >
                    {paginationRooms.map((room, index) => (
                      <Box key={index}>
                        <RoomItem room={room} mode="roomsbylocation" />
                      </Box>
                    ))}
                  </Box>
                  <Box marginTop={2}>
                    <Pagination
                      variant="outlined"
                      color="secondary"
                      shape="rounded"
                      count={roomsData.length >= 4 ? Math.round(roomsData.length / 4) : 1}
                      onChange={handleChangePage}
                      page={page}
                      size="large"
                    />
                  </Box>
                </Box>
              ) : (
                <Stack direction="row" gap={2} marginTop={2} alignItems="center">
                  <p>No room found</p>
                  <ErrorIcon />
                </Stack>
              )}
            </Box>
            <Box sx={{ display: { xs: "none", sm: "flex" }, position: "relative", width: "100%", flexGrow: 1 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920737.957642287!2d107.12742662953406!3d16.572332221671275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31157a4d736a1e5f%3A0xb03bb0c9e2fe62be!2sVietnam!5e0!3m2!1sen!2s!4v1664478847252!5m2!1sen!2s"
                style={{ width: "100%", height: "80vh" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default RoomListByLocation;
