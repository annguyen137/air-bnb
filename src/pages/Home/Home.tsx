import { Container } from "@mui/material";
import React, { useEffect } from "react";
import Banner from "./Banner/Banner";

import RoomList from "./RoomList/RoomList";

const Home = () => {
  return (
    <>
      <Banner />
      <RoomList />
    </>
  );
};

export default Home;
