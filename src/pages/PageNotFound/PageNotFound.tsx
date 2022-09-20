import React from "react";
import { Stack } from "@mui/material";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";

const PageNotFound = () => {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />
      <section>
        <p>Page not found</p>
      </section>
      <Footer variant="home" />
    </Stack>
  );
};

export default PageNotFound;
