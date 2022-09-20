import React, { useEffect, useRef, useState } from "react";
import styles from "./RoomDetail.module.scss";
import { useParams } from "react-router-dom";
import { Room } from "interfaces/room";
import { Box, Container, Button, Stack, TextField, Avatar, Rating, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import DryIcon from "@mui/icons-material/Dry";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import KitchenIcon from "@mui/icons-material/Kitchen";
import WifiIcon from "@mui/icons-material/Wifi";
import HeatPumpIcon from "@mui/icons-material/HeatPump";
import TvIcon from "@mui/icons-material/Tv";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import PoolIcon from "@mui/icons-material/Pool";
import ElevatorIcon from "@mui/icons-material/Elevator";
import HotTubIcon from "@mui/icons-material/HotTub";
import { getRoomDetail, resetRoomState } from "redux/slices/roomsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import Loading from "components/Loading/Loading";
import { getReviewsByRoomId, resetReviewState } from "redux/slices/reviewsSlice";
import CustomDrawer from "components/CustomDrawer/CustomDrawer";
import useDrawer from "utils/useDrawer";
import { fetchAll, resetFetchAllStatus } from "redux/slices/fetchAllSlice";
import { getUserDetail } from "redux/slices/authSlice";
import initFetch from "utils/initFetch";

const RoomDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [content, setContent] = useState({
    css: {} as SxProps,
    element: (<></>) as JSX.Element,
    icon: (<></>) as JSX.Element,
  });

  const { fetchAllLoading } = useSelector((state: RootState) => state.all);

  const { user } = useSelector((state: RootState) => state.auth);

  const { roomDetail } = useSelector((state: RootState) => state.rooms);

  const { reviewsByRoomId } = useSelector((state: RootState) => state.review);

  const ticketRef = useRef<HTMLElement>();

  const { roomId } = useParams() as { roomId: Room["_id"] };

  const [isOpen, toggleDrawer] = useDrawer();

  const viewImage = (): void => {
    setContent({
      ...content,
      element: (
        <Box sx={{ width: "70%", margin: "0 auto" }}>
          <img src={roomDetail.image} />
        </Box>
      ),
      icon: <ArrowBackIosIcon />,
    });
    toggleDrawer();
  };

  const viewAllReviews = (): void => {
    setContent({
      element: (
        <Stack direction={"row"} justifyContent="space-between" gap={"10px"} className={`${styles["reviews-all"]}`}>
          <Box flexGrow={1}>
            <h3 className="title --secondary-title">{reviewsByRoomId?.length} reviews</h3>
            <Box>
              <Typography component="legend">No rating given</Typography>
              <Rating name="no-value" value={null} />
            </Box>
          </Box>

          <Box className={`${styles["list-all"]}`}>
            {reviewsByRoomId.map((review) => (
              <Box key={review._id} className={`${styles["review-item"]}`}>
                <Box>
                  <Stack direction="row" alignItems="center" gap="12px">
                    <Box>{review.userId !== null ? <Avatar src={review.userId?.avatar} /> : <Avatar />}</Box>
                    <Stack>
                      <h4 className={`${styles["user-name"]}`}>
                        {review.userId !== null ? review.userId?.name : "******"}
                      </h4>
                      <span className={`${styles["review-date"]}`}>
                        {moment(review.created_at).format("DD/MM/YYYY hh:mm").toString()}
                      </span>
                    </Stack>
                  </Stack>
                </Box>
                <Box>
                  <p className={`${styles["user-review"]}`}>{review.content}</p>
                </Box>
              </Box>
            ))}
          </Box>
        </Stack>
      ),
      css: {
        width: "70vw !important",
        height: "90vh !important",
        margin: "0 auto !important",
        borderRadius: "20px",
        overflow: "hidden",
        top: "50% !important",
        left: "50%",
        transform: "translate(-50%, -50%) !important",
      },
      icon: <CloseIcon />,
    });
    toggleDrawer();
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // if (Object.keys(user).length) {
    //   dispatch(fetchAll([getRoomDetail({ roomId }),getUserDetail(""), getReviewsByRoomId({ roomId })]));
    // } else {
    //   dispatch(fetchAll([getRoomDetail({ roomId }), getReviewsByRoomId({ roomId })]));
    // }

    dispatch(fetchAll(initFetch(user, "detail", roomId)));

    return () => {
      document.title = "AirBnb";

      dispatch(resetFetchAllStatus());
      dispatch(resetReviewState());
      dispatch(resetRoomState());
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setContent({ css: {} as object, element: (<></>) as JSX.Element, icon: (<></>) as JSX.Element });
    }
  }, [isOpen]);

  return (
    <Box sx={{ marginTop: "25px" }}>
      <Container>
        <Box className={`${styles["detail"]}`}>
          <Box className={`${styles["detail-title"]}`}>
            {fetchAllLoading ? (
              <Loading width={300} />
            ) : (
              <Box>
                <h1>{roomDetail.name}</h1>
                <Stack direction={"row"} alignItems="center" columnGap={3}>
                  <Stack direction={"row"} alignItems="center">
                    <StarIcon />
                    <span>{roomDetail.locationId?.valueate}</span>
                  </Stack>
                  <span>{reviewsByRoomId.length} reviews</span>
                  <p>
                    {roomDetail.locationId?.name}, {roomDetail.locationId?.province}, {roomDetail.locationId?.country}
                  </p>
                </Stack>
              </Box>
            )}
          </Box>
          <Box className={`${styles["detail-img"]}`}>
            <Box className={`${styles["img-grid"]}`}>
              {fetchAllLoading ? (
                <Loading height={300} />
              ) : (
                <img src={roomDetail.image} alt={roomDetail.name} title={roomDetail.name} onClick={viewImage} />
              )}
            </Box>
            <Box className={`${styles["img-all"]}`}>
              <Button
                sx={{
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "white !important",
                  },
                }}
                variant="contained"
                onClick={viewImage}
              >
                Show all photos
              </Button>
            </Box>
          </Box>
          <Box className={`${styles["detail-info"]}`}>
            <Box className={`${styles["detail-left"]}`}>
              <Box className={`${styles["info"]}`}>
                {fetchAllLoading ? (
                  <ul>
                    <li>
                      <Loading width={100} />
                    </li>
                    <li>
                      <Loading width={100} />
                    </li>
                    <li>
                      <Loading width={100} />
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li>
                      <span>{roomDetail.guests}</span>
                      <span>guest</span>
                    </li>
                    <li>
                      <span>{roomDetail.bedRoom}</span>
                      <span>beds</span>
                    </li>
                    <li>
                      <span>{roomDetail.bath} </span>
                      <span>baths</span>
                    </li>
                  </ul>
                )}
              </Box>

              <Box className={`${styles["description"]}`}>
                {fetchAllLoading ? <Loading width={600} height={200} /> : <p>{roomDetail.description}</p>}
              </Box>

              <Box className={`${styles["offers"]}`}>
                {fetchAllLoading ? (
                  <Loading width={600} height={600} />
                ) : (
                  <>
                    <h3 className="title --secondary-title">What this place offers</h3>
                    <Box className={`${styles["offers-list"]}`}>
                      <Box className={`${styles["offer-item"]}`}>
                        <ElevatorIcon />
                        <span className={roomDetail.elevator ? `${styles["item-valid"]}` : `${styles["item-invalid"]}`}>
                          Elevator
                        </span>
                      </Box>

                      <Box className={`${styles["offer-item"]}`}>
                        <HotTubIcon />
                        <span className={roomDetail.hotTub ? `${styles["item-valid"]}` : `${styles["item-invalid"]}`}>
                          Hot Tub
                        </span>
                      </Box>

                      <Box className={`${styles["offer-item"]}`}>
                        <PoolIcon />
                        <span className={roomDetail.pool ? `${styles["item-valid"]}` : `${styles["item-invalid"]}`}>
                          Pool
                        </span>
                      </Box>

                      <Box className={`${styles["offer-item"]}`}>
                        <FireplaceIcon />
                        <span
                          className={
                            roomDetail.indoorFireplace ? `${styles["item-valid"]}` : `${styles["item-invalid"]}`
                          }
                        >
                          Indoor fireplace
                        </span>
                      </Box>

                      <Box className={`${styles["offer-item"]}`}>
                        <DryIcon />
                        <span className={roomDetail.dryer ? `${styles["item-valid"]}` : `${styles["item-invalid"]}`}>
                          Dryer
                        </span>
                      </Box>

                      <Box className={`${styles["offer-item"]}`}>
                        <FitnessCenterIcon />
                        <span className={roomDetail.gym ? `${styles["item-valid"]}` : `${styles["item-invalid"]}`}>
                          Gym
                        </span>
                      </Box>

                      <Box className={`${styles["offer-item"]}`}>
                        <KitchenIcon />
                        <span className={roomDetail.kitchen ? `${styles["item-valid"]}` : `${styles["item-invalid"]}`}>
                          Kitchen
                        </span>
                      </Box>

                      <Box className={`${styles["offer-item"]}`}>
                        <WifiIcon />
                        <span className={roomDetail.wifi ? `${styles["item-valid"]}` : `${styles["item-invalid"]}`}>
                          Wifi
                        </span>
                      </Box>

                      <Box className={`${styles["offer-item"]}`}>
                        <HeatPumpIcon />
                        <span className={roomDetail.heating ? `${styles["item-valid"]}` : `${styles["item-invalid"]}`}>
                          Heating
                        </span>
                      </Box>

                      <Box className={`${styles["offer-item"]}`}>
                        <TvIcon />
                        <span className={roomDetail.cableTV ? `${styles["item-valid"]}` : `${styles["item-invalid"]}`}>
                          Cable TV
                        </span>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
            <Box className={`${styles["detail-right"]}`}>
              <Box className={`${styles["book-ticket"]}`} ref={ticketRef}>
                <Box className={`${styles["ticket-inner"]}`}>
                  <Box>
                    <Stack direction="row" alignItems="baseline" justifyContent="space-between">
                      <Box className={`${styles["price"]}`}>
                        <span>${roomDetail.price}</span>
                        <span>night</span>
                      </Box>
                      <Box>
                        <p style={{ cursor: "pointer", textDecoration: "underline" }} onClick={viewAllReviews}>
                          {reviewsByRoomId?.length} reviews
                        </p>
                      </Box>
                    </Stack>
                    <Box className={`${styles["date-guest"]}`}></Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={`${styles["detail-reviews"]}`}>
            {fetchAllLoading ? (
              <Loading height={500} />
            ) : (
              <>
                <h3 className="title --secondary-title">{reviewsByRoomId?.length} reviews</h3>
                <Box className={`${styles["reviews-list"]}`}>
                  {[...reviewsByRoomId].slice(0, 6).map((review) => (
                    <Box key={review._id} className={`${styles["review-item"]}`}>
                      <Box>
                        <Stack direction="row" alignItems="center" gap="12px">
                          <Box>
                            <Avatar src={review.userId?.avatar} />
                          </Box>
                          <Stack>
                            <h4 className={`${styles["user-name"]}`}>
                              {review.userId !== null ? review.userId?.name : "******"}
                            </h4>
                            <span className={`${styles["review-date"]}`}>
                              {moment(review.created_at).format("DD/MM/YYYY hh:mm").toString()}
                            </span>
                          </Stack>
                        </Stack>
                      </Box>
                      <Box>
                        <p className={`${styles["user-review"]}`}>{review.content}</p>
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Box>
                  <Button
                    sx={{
                      marginTop: "20px",
                      backgroundColor: "white",
                      borderColor: "black",
                      "&:hover": {
                        backgroundColor: "white !important",
                      },
                    }}
                    variant="outlined"
                    onClick={viewAllReviews}
                  >
                    Show all {reviewsByRoomId?.length} reviews
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Container>
      <CustomDrawer
        anchor="bottom"
        toggle={toggleDrawer}
        isOpen={isOpen}
        css={content.css}
        children={content.element}
        icon={content.icon}
      />
    </Box>
  );
};

export default RoomDetail;
