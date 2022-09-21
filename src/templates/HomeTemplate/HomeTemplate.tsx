import React from "react";
import { Stack } from "@mui/material";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { Outlet } from "react-router-dom";

const HomeTemplate = () => {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />
      <section>
        <Outlet />
      </section>
      <Footer variant="home" />
    </Stack>
  );
};

export default HomeTemplate;
