import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll, resetFetchAllStatus } from "redux/slices/fetchAllSlice";
import { resetLocationState } from "redux/slices/locationsSlice";
import { resetRoomState } from "redux/slices/roomsSlice";
import { AppDispatch, RootState } from "redux/store";
import { scrollTop } from "utils/eventFunction";
import initFetch from "utils/initFetch";
import { clearLocalStorage } from "utils/storage";
import useIsFirstLoad from "utils/useIsFirstLoad";
import Banner from "./Banner/Banner";

import RoomList from "./RoomList/RoomList";

const Home = () => {
  window.scroll(0, 0);
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);

  const [isFirstLoad, setIsFirstLoad] = useIsFirstLoad();

  useEffect(() => {
    window.scroll(0, 0);
    if (isFirstLoad) {
      window.addEventListener("beforeunload", scrollTop);
      setIsFirstLoad(false);
      dispatch(fetchAll(initFetch(user, "home")));
    }

    return () => {
      window.removeEventListener("beforeunload", scrollTop);

      // CLEANUP STATE WHEN COMPONENT UNMOUNT, FOR REFETCHING NEWEST DATA FROM BACKEND API IF COMPONENT IS MOUNT NEXT TIME
      dispatch(resetFetchAllStatus());
      dispatch(resetRoomState());
      dispatch(resetLocationState());
    };
  }, []);

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Banner />
      <RoomList />
    </Box>
  );
};

export default Home;
