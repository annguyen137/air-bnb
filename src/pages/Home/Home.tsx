import { Container } from "@mui/material";
import React from "react";

import RoomList from "./RoomList/RoomList";

const Home = () => {
  return (
    <section style={{ marginBottom: "48px" }}>
      <RoomList />
    </section>
  );
};

export default Home;
