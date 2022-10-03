import React, { useEffect, useRef, useState } from "react";
import styles from "./RoomDetail.module.scss";
import { Link, useParams } from "react-router-dom";
import { Room } from "interfaces/room";
import {
  Box,
  Container,
  Button,
  Stack,
  TextField,
  Avatar,
  Rating,
  Typography,
  Popover,
  Breadcrumbs,
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
import HomeIcon from "@mui/icons-material/Home";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import KitchenIcon from "@mui/icons-material/Kitchen";
import WifiIcon from "@mui/icons-material/Wifi";
import HeatPumpIcon from "@mui/icons-material/HeatPump";
import TvIcon from "@mui/icons-material/Tv";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import PoolIcon from "@mui/icons-material/Pool";
import ElevatorIcon from "@mui/icons-material/Elevator";
import HotTubIcon from "@mui/icons-material/HotTub";
import { bookRoomById, resetRoomState } from "redux/slices/roomsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import Loading from "components/Loading/Loading";
import { getReviewsByRoomId, postAReviewByRoomId, resetReviewState } from "redux/slices/reviewsSlice";
import CustomDrawer from "components/CustomDrawer/CustomDrawer";
import useDrawer from "utils/useDrawer";
import { fetchAll, resetFetchAllStatus } from "redux/slices/fetchAllSlice";
import { getUserDetail } from "redux/slices/authSlice";
import initFetch from "utils/initFetch";
import { toast } from "react-toastify";
import { resetReviewAction } from "redux/slices/reviewsSlice";
import PopModal from "components/PopModal/PopModal";
import useModalHook from "utils/useModalHook";
import Login from "pages/Login/Login";
import { BookTicket } from "interfaces/ticket";
import { resetLocationState } from "redux/slices/locationsSlice";

interface TicketForm {
  roomId: Room["_id"];
  checkIn: Date;
  checkOut: Date;
  guestNumber?: number;
}

interface ReviewForm {
  roomId: Room["_id"];
  content: "";
}

const RoomDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { roomId } = useParams() as { roomId: Room["_id"] };

  const [content, setContent] = useState({
    sx: {} as SxProps,
    element: (<></>) as JSX.Element,
    icon: (<></>) as JSX.Element,
  });

  const { fetchAllLoading } = useSelector((state: RootState) => state.all);

  const { user } = useSelector((state: RootState) => state.auth);

  const { roomDetail, roomActionSuccess } = useSelector((state: RootState) => state.rooms);

  const { reviewsByRoomId, reviewActionSuccess, isReviewsLoading } = useSelector((state: RootState) => state.review);

  const { isOpen, toggleDrawer } = useDrawer();

  const { isModalOpen, handleOpenModal, handleCloseModal } = useModalHook();

  const [confirmAnchor, setConfirmAnchor] = useState<HTMLElement | null>(null);

  const [ticket, setTicket] = useState<BookTicket>({ roomId: roomId, checkIn: "", checkOut: "" });

  const viewImage = (): void => {
    setContent({
      element: (
        <Box sx={{ width: { xs: "90%", sm: "80%", md: "70%" }, margin: "0 auto" }}>
          <img src={roomDetail.image} />
        </Box>
      ),
      icon: <ArrowBackIosIcon />,
      sx: {
        top: 0,
      },
    });
    toggleDrawer();
  };

  const viewAllReviews = (): void => {
    setContent({
      element: (
        <Stack direction={{ xs: "column", md: "row" }} gap={2} flexGrow={1} className={`${styles["reviews-all"]}`}>
          <Box sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>
            <h3 className="title ">{reviewsByRoomId?.length} reviews</h3>
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
                        {moment(review.created_at).format("DD/MM/YYYY hh:mm")}
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
          md: "70vw !important",
          lg: "60vw !important",
          "@media (max-width: 743px)": {
            width: "90vw !important",
          },
        },
        height: {
          sm: "60vh !important",
          md: "70vh !important",
          lg: "80vh !important",
          "@media (max-width: 743px)": {
            height: "50vh !important",
          },
        },
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
      sx: (theme) => ({
        display: "flex",
        width: {
          sm: "70%",
          md: "50%",
          "@media (max-width: 743px)": {
            width: "90vw !important",
          },
        },
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      }),
    });
    handleOpenModal();
  };

  const bookTicketSchema = yup.object().shape({
    roomId: yup.string().required().default(roomId),
    checkIn: yup
      .date()
      .required("Please select checkin date!")
      .typeError("Invalid date!")
      .min(new Date(), "Cannot book past date"),
    checkOut: yup
      .date()
      .required("Please select checkout date!")
      .typeError("Invalid date!")
      .when("checkIn", (checkIn, schema) => {
        if (moment(checkIn).isValid()) {
          const dayAfter = new Date(checkIn.getTime() + 86400000);
          return schema.min(dayAfter, "Checkout date must be after checkin date");
        }
        return schema;
      }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<TicketForm>({
    mode: "onBlur",
    resolver: yupResolver(bookTicketSchema),
    defaultValues: {
      checkIn: new Date(),
      checkOut: new Date(),
    },
  });

  const onSubmitTicket: SubmitHandler<TicketForm> = (values, event) => {
    if (Object.keys(user).length) {
      console.log(values);
      setTicket({
        roomId: values.roomId,
        checkIn: moment(values.checkIn).toISOString(),
        checkOut: moment(values.checkOut).toISOString(),
      });
      setConfirmAnchor(event?.target);
    } else {
      showLoginRequire();
    }
  };

  const onErrorTicket: SubmitErrorHandler<TicketForm> = (error) => {
    // console.log(error);
    if (Object.keys(user).length) {
      toast.error("Please check your checkin / checkout date", {
        isLoading: false,
        autoClose: 2000,
        closeOnClick: true,
      });
    } else {
      showLoginRequire();
    }
  };

  const {
    control: controlReview,
    handleSubmit: handleSubmitReview,
    formState: { errors: errorsReview },
    setFocus: setFocusReview,
    clearErrors: clearErrorsReview,
    reset: resetReviewForm,
  } = useForm<ReviewForm>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      roomId: roomId,
      content: "",
    },
  });

  const onSubmitRewiew: SubmitHandler<ReviewForm> = (value) => {
    if (Object.keys(user).length) {
      dispatch(postAReviewByRoomId(value));
    } else {
      showLoginRequire();
    }
  };

  const onErrorReview: SubmitErrorHandler<ReviewForm> = (error) => {
    // console.log(error);
    toast.error("Please fill a review before posting!", { isLoading: false, autoClose: 1000, pauseOnHover: true });
    setFocusReview("content");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    dispatch(fetchAll(initFetch(user, "detail", roomId)));

    return () => {
      document.title = "AirBnb";

      dispatch(resetFetchAllStatus());
      dispatch(resetReviewState());
      dispatch(resetRoomState());
      dispatch(resetLocationState());
    };
  }, []);

  useEffect(() => {
    if (reviewActionSuccess) {
      dispatch(resetReviewAction());
      dispatch(getReviewsByRoomId({ roomId }));
      resetReviewForm();
    }

    if (roomActionSuccess) {
      dispatch(getUserDetail(user._id));
      reset();
      setConfirmAnchor(null);
      setTicket({ roomId: roomId, checkIn: "", checkOut: "" });
    }
  }, [reviewActionSuccess, roomActionSuccess]);

  useEffect(() => {
    if (!isOpen) {
      setContent({ sx: {} as SxProps, element: (<></>) as JSX.Element, icon: (<></>) as JSX.Element });
    }

    // close login modal after success login
    if (Object.keys(user).length) {
      if (isModalOpen) {
        handleCloseModal();
      }
    }
  }, [isOpen, user]);

  return (
    <Box sx={{ marginTop: "25px", width: "100%" }}>
      <Container>
        <Breadcrumbs>
          <Link to="/">
            <Stack direction={"row"} alignItems="center">
              <HomeIcon />
              <Typography fontWeight={"700"}>Home</Typography>
            </Stack>
          </Link>
          <p>Room</p>
        </Breadcrumbs>
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
                    <Stack direction={"row"} alignItems="baseline" justifyContent="space-between">
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
                        <Stack direction={{ xs: "column", md: "row" }} gap={2} marginBottom={2}>
                          <Box>
                            <Controller
                              name="checkIn"
                              control={control}
                              defaultValue={moment().toDate()}
                              render={({ field: { onChange, value, ref, ...rest } }) => (
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                  <DatePicker
                                    disablePast
                                    inputFormat="YYYY/MM/DD"
                                    label="Check in"
                                    onChange={onChange}
                                    value={value}
                                    inputRef={ref}
                                    {...rest}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        margin="dense"
                                        focused={!!errors.checkIn}
                                        onBlur={() => errors && clearErrors()}
                                        fullWidth
                                        required
                                        size="medium"
                                        error={!!errors?.checkIn}
                                        helperText={errors.checkIn?.message}
                                        InputLabelProps={{ shrink: true }}
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
                              defaultValue={moment().toDate()}
                              render={({ field: { onChange, value, ref, ...rest } }) => (
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                  <DatePicker
                                    disablePast
                                    inputFormat="YYYY/MM/DD"
                                    label="Check out"
                                    onChange={onChange}
                                    value={value}
                                    inputRef={ref}
                                    {...rest}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        margin="dense"
                                        focused={!!errors.checkOut}
                                        onBlur={() => errors && clearErrors()}
                                        required
                                        fullWidth
                                        size="medium"
                                        error={Boolean(errors?.checkOut)}
                                        helperText={errors.checkOut?.message}
                                        InputLabelProps={{ shrink: true }}
                                      />
                                    )}
                                  />
                                </LocalizationProvider>
                              )}
                            />
                          </Box>
                        </Stack>

                        <Box>
                          <Button
                            variant="contained"
                            type="submit"
                            size="large"
                            fullWidth
                            sx={{
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
                      <Box>
                        <Popover
                          open={Boolean(confirmAnchor)}
                          anchorEl={confirmAnchor}
                          onClose={() => setConfirmAnchor(null)}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          children={
                            <Box padding={5}>
                              <Stack marginBottom={2}>
                                <p>Confirm book this room?</p>
                                <p>
                                  Checkin: <span>{moment(ticket.checkIn).format("YYYY/MM/DD")}</span>
                                </p>
                                <p>
                                  Checout: <span>{moment(ticket.checkOut).format("YYYY/MM/DD")}</span>
                                </p>
                              </Stack>
                              <Stack direction={"row"} columnGap={2}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="button"
                                  sx={{
                                    color: "white !important",

                                    "&:hover": {
                                      filter: "brightness(80%)",
                                      color: "black !important",
                                    },
                                  }}
                                  onClick={() => dispatch(bookRoomById(ticket))}
                                >
                                  Book
                                </Button>
                                <Button
                                  variant="contained"
                                  type="button"
                                  color="error"
                                  sx={{
                                    color: "white !important",

                                    "&:hover": {
                                      color: "black !important",
                                    },
                                  }}
                                  onClick={() => {
                                    setConfirmAnchor(null);
                                    setTicket({ roomId: roomId, checkIn: "", checkOut: "" });
                                  }}
                                >
                                  Change mind
                                </Button>
                              </Stack>
                            </Box>
                          }
                        ></Popover>
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
                              {moment(review.created_at).format("DD/MM/YYYY hh:mm")}
                            </span>
                          </Stack>
                        </Stack>
                      </Box>
                      <Box>
                        <p className={`${styles["user-review"]}`}>{review.content}</p>
                      </Box>
                    </Box>
                  ))}
                  {reviewsByRoomId.length <= 6 && isReviewsLoading && (
                    <Stack rowGap={"17px"}>
                      <Stack direction={"row"} columnGap={"12px"} alignItems="center">
                        <Loading width={40} height={40} css={{ borderRadius: "50%" }} />
                        <Box>
                          <Loading width={150} />
                        </Box>
                      </Stack>
                      <Box>
                        <Loading width={300} />
                      </Box>
                    </Stack>
                  )}
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
        customCss={{ zIndex: 1700 }}
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
