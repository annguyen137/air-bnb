import React from "react";
import { Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

import styles from "./Banner.module.scss";

const Banner = () => {
  return (
    <Carousel
      animation="slide"
      autoPlay
      interval={4000}
      duration={1000}
      swipe={true}
      NextIcon={<ArrowForwardIosOutlinedIcon sx={{ color: "white" }} />}
      PrevIcon={<ArrowBackIosOutlinedIcon sx={{ color: "white" }} />}
      stopAutoPlayOnHover
      navButtonsAlwaysVisible
    >
      <Box className={styles["banner"]}>
        <img src="../img/banner-1.jpg" alt="banner" />
      </Box>
      <Box className={styles["banner"]}>
        <img src="../img/banner-2.jpeg" alt="banner" />
      </Box>
      <Box className={styles["banner"]}>
        <img src="../img/banner-3.png" alt="banner" />
      </Box>
    </Carousel>
  );
};

export default Banner;
