import React from "react";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { Stack } from "@mui/material";
import RoomListByLocation from "pages/RoomListByLocation/RoomListByLocation";

const RoomListByLocationTemplate = () => {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header variant="roomsbylocation" />
      <section style={{ marginBottom: 0 }}>
        <RoomListByLocation />
      </section>
      <Footer variant="detail" />
    </Stack>
  );
};

export default RoomListByLocationTemplate;
