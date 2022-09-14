import React from "react";
import { Typography } from "@mui/material";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { Outlet } from "react-router-dom";

const HomeTemplate = () => {
  return (
    <>
      <Header />
      <section style={{ marginBottom: "48px" }}>
        <Outlet />
      </section>
      <Footer variant="home" />
    </>
  );
};

export default HomeTemplate;
