import React from "react";
import { Box, Button, Stack } from "@mui/material";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { Container } from "@mui/system";
import styles from "./PageNotFound.module.scss";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />
      <section>
        <Box sx={{ width: "100%" }}>
          <Container>
            <Box className={`${styles["page-not-found"]}`}>
              <Stack direction={{ sm: "row" }}>
                <Box className={`${styles["content"]}`}>
                  <h1>Oops!</h1>
                  <h2>We can't seem to find the page you're looking for.</h2>
                  <p>Error code: 404</p>
                  <Box className={`${styles["back-to-home"]}`}>
                    <NavLink to={"/"}>
                      <Button color="info" variant="outlined">
                        Back to home
                      </Button>
                    </NavLink>
                  </Box>
                </Box>
                <Box className={`${styles["img"]}`}>
                  <img src="../img/notfound-img.gif" alt="" />
                </Box>
              </Stack>
            </Box>
          </Container>
        </Box>
      </section>
      <Footer variant="home" />
    </Stack>
  );
};

export default PageNotFound;
