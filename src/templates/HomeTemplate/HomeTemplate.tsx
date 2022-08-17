import { Typography } from "@mui/material";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const HomeTemplate = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeTemplate;
