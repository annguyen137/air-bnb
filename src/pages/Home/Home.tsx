import { Box, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll, resetFetchAllStatus } from "redux/slices/fetchAllSlice";
import { resetLocationState } from "redux/slices/locationsSlice";
import { resetRoomState } from "redux/slices/roomsSlice";
import { AppDispatch, RootState } from "redux/store";
import { scrollTop } from "utils/eventFunction";
import initFetch from "utils/initFetch";
import useIsFirstLoad from "utils/useIsFirstLoad";
import Banner from "./Banner/Banner";

import RoomList from "./RoomList/RoomList";

const Home = () => {
  // window.scroll(0, 0);
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);

  const { isFirstLoad, setIsFirstLoad } = useIsFirstLoad();

  const [showButtonBTT, setShowButtonBTT] = useState(false);

  const showBackToTop = () => {
    if (window.scrollY >= 500) {
      setShowButtonBTT(true);
    } else {
      setShowButtonBTT(false);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);

    window.addEventListener("scroll", showBackToTop);

    if (isFirstLoad) {
      window.addEventListener("beforeunload", scrollTop);
      setIsFirstLoad(false);
      dispatch(fetchAll(initFetch(user, "home")));
    }

    return () => {
      window.removeEventListener("beforeunload", scrollTop);

      window.removeEventListener("scroll", showBackToTop);

      // CLEANUP STATE WHEN COMPONENT UNMOUNT, FOR REFETCHING NEWEST DATA FROM BACKEND API IF COMPONENT IS MOUNT NEXT TIME
      dispatch(resetFetchAllStatus());
      dispatch(resetRoomState());
      dispatch(resetLocationState());
    };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Banner />
      <RoomList />
      {showButtonBTT && (
        <Tooltip title="Back to top">
          <Box
            sx={{
              cursor: "pointer",

              "&::after": {
                transition: "all 0.3s ease-in",
                content: "'↑'",
                fontSize: "30px",
                fontWeight: 700,
                color: "#fff",
                width: "50px",
                height: "50px",
                position: "fixed",
                zIndex: 100,
                bottom: "80px",
                right: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ff385c",
                borderRadius: "50%",
                boxShadow: "0 10px 20px 5px rgb(0 0 0 / 20%)",
              },

              "&:hover": {
                "&::after": {
                  boxShadow: "0 10px 10px 5px rgb(0 0 0 / 20%)",
                  transform: "translateY(-5px)",
                },
              },
            }}
            onClick={() => {
              setShowButtonBTT(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          ></Box>
        </Tooltip>
      )}
    </Box>
  );
};

export default Home;
