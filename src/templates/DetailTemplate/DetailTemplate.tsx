import React from "react";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import RoomDetail from "pages/RoomDetail/RoomDetail";
import { Stack } from "@mui/material";

const DetailTemplate = () => {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header variant="detail" />
      <section>
        <RoomDetail />
      </section>
      <Footer variant="detail" />
    </Stack>
  );
};

export default DetailTemplate;
