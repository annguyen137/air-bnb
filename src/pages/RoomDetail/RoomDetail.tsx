import React, { useEffect, useRef, useState } from "react";
import styles from "./RoomDetail.module.scss";
import { useParams } from "react-router-dom";
import { Room } from "interfaces/room";
import {
  Box,
  Container,
  Button,
  Stack,
  TextField,
  Select,
  FormHelperText,
  Input,
  Avatar,
  Rating,
  Typography,
} from "@mui/material";
import { SxProps } from "@mui/system";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useForm, SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { resetRoomState } from "redux/slices/roomsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import Loading from "components/Loading/Loading";
import { getReviewsByRoomId, postAReviewByRoomId, resetReviewState } from "redux/slices/reviewsSlice";
import CustomDrawer from "components/CustomDrawer/CustomDrawer";
import useDrawer from "utils/useDrawer";
import { fetchAll, resetFetchAllStatus } from "redux/slices/fetchAllSlice";
import initFetch from "utils/initFetch";
import { BookTicket } from "interfaces/ticket";
import { toast } from "react-toastify";
import { resetReviewAction } from "redux/slices/reviewsSlice";
import { ReviewBodyValue } from "interfaces/review";
import PopModal from "components/PopModal/PopModal";
import useModalHook from "utils/useModalHook";
import Login from "pages/Login/Login";

const RoomDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [content, setContent] = useState({
    sx: {} as SxProps,
    element: (<></>) as JSX.Element,
    icon: (<></>) as JSX.Element,
  });

  const { fetchAllLoading } = useSelector((state: RootState) => state.all);

  const { user } = useSelector((state: RootState) => state.auth);

  const { roomDetail } = useSelector((state: RootState) => state.rooms);

  const { reviewsByRoomId, reviewActionSuccess } = useSelector((state: RootState) => state.review);

  const { roomId } = useParams() as { roomId: Room["_id"] };

  const [isOpen, toggleDrawer] = useDrawer();

  const [isModalOpen, handleOpenModal, handleCloseModal] = useModalHook();

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
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          gap={2}
          className={`${styles["reviews-all"]}`}
        >
          <Box flexGrow={1}>
            <h3 className="title --secondary-title">{reviewsByRoomId?.length} reviews</h3>
            <Stack direction={"row"} gap={2} alignItems={"center"}>
              <Typography component="legend">{roomDetail.locationId?.valueate ?? "No rating given"}</Typography>
              <Rating readOnly max={10} value={roomDetail.locationId?.valueate ?? null} />
            </Stack>
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
      sx: (theme) => ({
        width: {
          sm: "80vw !important",
          lg: "70vw !important",
          "@media (max-width: 743px)": {
            width: "90vw !important",
          },
        },
        height: "80vh !important",
        margin: "0 auto !important",
        borderRadius: "20px",
        overflow: "hidden",
        top: "50% !important",
        left: "50%",
        transform: "translate(-50%, -50%) !important",
      }),
      icon: <CloseIcon />,
    });
    toggleDrawer();
  };

  const showLoginRequire = () => {
    setContent({
      element: <Login modalMode={true} />,
      icon: <CloseIcon />,
      sx: {
        display: "flex",
        width: "50%",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      },
    });
    handleOpenModal();
  };

  const bookTicketSchema = yup.object().shape({
    roomId: yup.string().required().default(roomId),
    checkIn: yup.date().required("Please select checkin date!").min(new Date(), "Cannot book past date"),
    checkOut: yup.date().required("Please select checkin date!").min(new Date(), "Cannot book past date"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BookTicket>({
    mode: "onSubmit",
    resolver: yupResolver(bookTicketSchema),
  });

  const onSubmitTicket: SubmitHandler<BookTicket> = (values) => {
    console.log(values);
    if (Object.keys(user).length) {
    } else {
      showLoginRequire();
    }
  };

  const onErrorTicket: SubmitErrorHandler<BookTicket> = (error) => {
    console.log(error);
  };

  const {
    control: controlReview,
    handleSubmit: handleSubmitReview,
    formState: { errors: errorsReview },
    setFocus: setFocusReview,
    clearErrors: clearErrorsReview,
    reset: resetReviewForm,
  } = useForm<{ roomId: string; content: string }>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      roomId: roomId,
      content: "",
    },
  });

  const onSubmitRewiew: SubmitHandler<{ roomId: Room["_id"]; content: ReviewBodyValue["content"] }> = (value) => {
    if (Object.keys(user).length) {
      dispatch(postAReviewByRoomId(value));
    } else {
      showLoginRequire();
    }
  };

  const onErrorReview: SubmitErrorHandler<{ roomId: string; content: string }> = (error) => {
    // console.log(error);
    toast.error("Please enter some reviews before posting!", { isLoading: false, autoClose: 1000, pauseOnHover: true });
    setFocusReview("content");
  };

  useEffect(() => {
    if (reviewActionSuccess) {
      dispatch(resetReviewAction());
      dispatch(getReviewsByRoomId({ roomId }));
      resetReviewForm();
    }
  }, [reviewActionSuccess]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

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
      setContent({ sx: {} as SxProps, element: (<></>) as JSX.Element, icon: (<></>) as JSX.Element });
    }

    if (Object.keys(user).length) {
      if (isModalOpen) {
        handleCloseModal();
      }
    }
  }, [isOpen, user]);

  return (
    <Box sx={{ marginTop: "25px", width: "100%" }}>
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
                  <Typography
                    variant="body1"
                    sx={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={viewAllReviews}
                  >
                    {reviewsByRoomId.length} reviews
                  </Typography>
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
              <Box className={`${styles["book-ticket"]}`}>
                <Box className={`${styles["ticket-inner"]}`}>
                  <Box>
                    <Stack direction="row" alignItems="baseline" justifyContent="space-between">
                      <Box className={`${styles["price"]}`}>
                        <span>${roomDetail.price}</span>
                        <span>night</span>
                      </Box>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ cursor: "pointer", textDecoration: "underline" }}
                          onClick={viewAllReviews}
                        >
                          {reviewsByRoomId.length} reviews
                        </Typography>
                      </Box>
                    </Stack>
                    <Box>
                      <Box
                        component={"form"}
                        noValidate
                        autoComplete="off"
                        className={`${styles["ticket-form"]}`}
                        onSubmit={handleSubmit(onSubmitTicket, onErrorTicket)}
                      >
                        <Box>
                          <Controller
                            name="checkIn"
                            control={control}
                            render={({ field: { onChange, value, ref, ...rest } }) => (
                              <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                  minDate={new Date()}
                                  disablePast
                                  inputFormat="YYYY/MM/DD"
                                  label="Check in"
                                  onChange={(e) => {
                                    onChange(e);
                                  }}
                                  value={value}
                                  ref={ref}
                                  {...rest}
                                  renderInput={(params) => (
                                    <TextField
                                      margin="dense"
                                      required
                                      size="medium"
                                      error={!!errors?.checkIn}
                                      helperText={errors.checkIn?.message}
                                      FormHelperTextProps={{
                                        children: errors.checkIn?.message,
                                        error: !!errors?.checkIn,
                                      }}
                                      InputLabelProps={{ shrink: true }}
                                      {...params}
                                    />
                                  )}
                                />
                              </LocalizationProvider>
                            )}
                          />
                        </Box>
                        <Box>
                          <Controller
                            name="checkOut"
                            control={control}
                            render={({ field: { onChange, value, ref, ...rest } }) => (
                              <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                  minDate={new Date()}
                                  disablePast
                                  inputFormat="YYYY/MM/DD"
                                  label="Check out"
                                  onChange={(e) => {
                                    onChange(e);
                                  }}
                                  value={value}
                                  ref={ref}
                                  {...rest}
                                  renderInput={(params) => (
                                    <TextField
                                      margin="dense"
                                      required
                                      size="medium"
                                      error={!!errors?.checkOut}
                                      helperText={errors.checkOut?.message}
                                      FormHelperTextProps={{
                                        children: errors.checkOut?.message,
                                        error: !!errors?.checkOut,
                                      }}
                                      InputLabelProps={{ shrink: true }}
                                      {...params}
                                    />
                                  )}
                                />
                              </LocalizationProvider>
                            )}
                          />
                        </Box>
                        {/* <Box>
                          <Controller
                            name="guestAmount"
                            control={control}
                            render={({ field }) => <Select fullWidth {...field} />}
                          />
                        </Box> */}
                        <Box>
                          <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            sx={{
                              height: "100%",
                              backgroundColor: "#ff385c",
                              "&:hover": {
                                backgroundColor: "#ff385c !important",
                                filter: "brightness(80%)",
                              },
                            }}
                          >
                            Book now
                          </Button>
                        </Box>
                      </Box>
                    </Box>
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
                <Box
                  component={"form"}
                  noValidate
                  autoComplete="off"
                  marginBottom={5}
                  onSubmit={handleSubmitReview(onSubmitRewiew, onErrorReview)}
                >
                  <Stack direction={"row"} gap={2} alignItems="baseline">
                    <Box
                      sx={(theme) => ({
                        width: "100%",
                        [theme.breakpoints.up("lg")]: {
                          width: "50%",
                        },
                      })}
                    >
                      <Controller
                        name="content"
                        control={controlReview}
                        defaultValue={""}
                        rules={{
                          required: {
                            value: true,
                            message: "Please enter some reviews before posting!",
                          },
                          min: 1,
                        }}
                        render={({ field: { onBlur, ref, ...rest } }) => (
                          <TextField
                            variant="standard"
                            fullWidth
                            placeholder="Post a review"
                            onBlur={(e) => {
                              onBlur();
                              clearErrorsReview("content");
                            }}
                            error={!!errorsReview.content}
                            helperText={errorsReview.content?.message}
                            inputRef={ref}
                            {...rest}
                          />
                        )}
                      />
                    </Box>

                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        height: "100%",
                        color: "white !important",
                        backgroundColor: "#ff385c",
                        "&:hover": {
                          backgroundColor: "#ff385c !important",
                          filter: "brightness(80%)",
                        },
                      }}
                    >
                      Post
                    </Button>
                  </Stack>
                </Box>

                <Stack direction={"row"} gap={2} alignItems="flex-start">
                  <Stack direction={"row"} alignItems="center">
                    <StarIcon />
                    <Typography variant="body1">{roomDetail.locationId?.valueate}</Typography>
                  </Stack>
                  <h3 className="title --secondary-title">{reviewsByRoomId?.length} reviews</h3>
                </Stack>
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
        css={content.sx}
        children={content.element}
        icon={content.icon}
      />
      <PopModal
        open={isModalOpen}
        onClose={handleCloseModal}
        css={content.sx}
        icon={content.icon}
        children={content.element}
      />
    </Box>
  );
};

export default RoomDetail;
