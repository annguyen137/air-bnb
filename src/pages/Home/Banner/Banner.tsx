import React from "react";
import styles from "./Banner.module.scss";
import { Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import Loading from "components/Loading/Loading";

const Banner = () => {
  const { fetchAllLoading } = useSelector((state: RootState) => state.all);

  // if (fetchAllLoading) {
  //   return (
  //     <Loading
  //       css={{
  //         "@media (max-width: 400px)": {
  //           height: "40vh",
  //         },
  //         "@media (max-width: 744px)": {
  //           height: "50vh",
  //         },
  //         "@media (max-width: 949px)": {
  //           height: "60vh",
  //         },
  //         "@media (min-width: 950px)": {
  //           height: "80vh",
  //         },
  //       }}
  //     />
  //   );
  // }

  return (
    <Carousel
      animation="fade"
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
        <img src="../img/banner-3.jpg" alt="banner" />
      </Box>
    </Carousel>
  );
};

export default Banner;
