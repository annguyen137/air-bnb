import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Stack,
  Container,
  Button,
  FormHelperText,
  IconButton,
  FormLabel,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Breadcrumbs,
  Typography,
  SxProps,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  Controller,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Profile.module.scss";
import { getUserDetail } from "redux/slices/authSlice";
import { updateUserAvatar, updateUserInfo } from "redux/slices/userSlice";
import Loading from "components/Loading/Loading";
import { resetUserActionStatus } from "redux/slices/userSlice";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import PopModal from "components/PopModal/PopModal";
import useModalHook from "utils/useModalHook";
import { getTicketsByUser } from "redux/slices/ticketsSlice";
import { Review } from "interfaces/review";
import { Ticket } from "interfaces/ticket";

interface AvataForm {
  avatar: FileList;
}

export interface UpdateInfoForm {
  name: string;
  email: string;
  type: string;
  phone: string;
  birthday: Date;
  gender: boolean;
  address: string;
}

const Profile = () => {
  window.scroll(0, 0);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { user, token, isDetailLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const { userActionSuccess, userActionPending, error } = useSelector(
    (state: RootState) => state.user
  );

  const { ticketsByUser, isTicketLoading } = useSelector(
    (state: RootState) => state.ticket
  );

  const [preview, setPreview] = useState(null);

  const [isChangeAvatar, setIsChangeAvatar] = useState(false);

  const [editFormVisible, setEditFormVisible] = useState(false);

  const { isModalOpen, handleOpenModal, handleCloseModal } = useModalHook();

  const [content, setContent] = useState<{
    title: string;
    list: Array<Ticket | Review>;
  }>({
    title: "My Tickets",
    list: [],
  });

  const modalProperties: {
    element: JSX.Element;
    sx: SxProps;
    icon: JSX.Element;
  } = {
    element: (
      <Stack
        gap={2}
        flexGrow={1}
        paddingY={2}
        paddingX={{ xs: 2, sm: 5, md: 8 }}
        sx={{ maxHeight: "100%", height: "100%" }}
      >
        <Box
          sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
          paddingBottom={1}
        >
          {isTicketLoading ? (
            <Loading width={200} />
          ) : (
            <h3 className="title ">{content.title}</h3>
          )}
        </Box>
        <Box sx={{ height: "100%", overflowY: "scroll" }} paddingY={1}>
          <Stack gap={{ xs: 2, sm: 3 }}>
            {isTicketLoading ? (
              <>
                <Box marginX={{ xs: 1, sm: 2 }}>
                  <Stack direction="row" columnGap={2}>
                    <Loading height={50} css={{ width: "50%" }} />
                    <Stack flexGrow={1} justifyContent="space-between">
                      <Loading />
                      <Loading />
                    </Stack>
                  </Stack>
                </Box>
                <Box marginX={{ xs: 1, sm: 2 }}>
                  <Stack direction="row" columnGap={2}>
                    <Loading height={50} css={{ width: "50%" }} />
                    <Stack flexGrow={1} justifyContent="space-between">
                      <Loading />
                      <Loading />
                    </Stack>
                  </Stack>
                </Box>
                <Box marginX={{ xs: 1, sm: 2 }}>
                  <Stack direction="row" columnGap={2}>
                    <Loading height={50} css={{ width: "50%" }} />
                    <Stack flexGrow={1} justifyContent="space-between">
                      <Loading />
                      <Loading />
                    </Stack>
                  </Stack>
                </Box>
                <Box marginX={{ xs: 1, sm: 2 }}>
                  <Stack direction="row" columnGap={2}>
                    <Loading height={50} css={{ width: "50%" }} />
                    <Stack flexGrow={1} justifyContent="space-between">
                      <Loading />
                      <Loading />
                    </Stack>
                  </Stack>
                </Box>
              </>
            ) : (
              <>
                {ticketsByUser?.map((ticket, index) => {
                  return (
                    <Box
                      padding={{ xs: 1, sm: 2 }}
                      marginX={{ xs: 1, sm: 2 }}
                      key={index}
                      border="1px solid rgba(0,0,0,0.5)"
                      borderRadius={"10px"}
                    >
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        rowGap={2}
                        columnGap={2}
                        justifyContent={"space-between"}
                      >
                        <Box
                          sx={{ cursor: "pointer" }}
                          onClick={() =>
                            ticket.roomId?._id &&
                            navigate(`/rooms/${ticket.roomId?._id}`)
                          }
                        >
                          <img src={ticket.roomId?.image} alt="" />
                        </Box>
                        <Box
                          sx={{
                            width: {
                              xs: "100%",
                              sm: "50%",
                            },
                          }}
                        >
                          <Stack
                            rowGap={1}
                            sx={{
                              "&:hover": {
                                textDecoration: "underline",
                              },
                            }}
                          >
                            <p>
                              Checkin date:{" "}
                              {moment(ticket.checkIn).format("YYYY/MM/DD")}
                            </p>
                            <p>
                              Checkout date:{" "}
                              {moment(ticket.checkIn).format("YYYY/MM/DD")}
                            </p>
                          </Stack>
                          <Stack flexGrow={1} marginTop={2} rowGap={1}>
                            <Typography
                              color={"Highlight"}
                              variant="body1"
                              sx={{
                                "&:hover": {
                                  textDecoration: "underline",
                                },
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                ticket.roomId?._id &&
                                navigate(`/rooms/${ticket.roomId?._id}`)
                              }
                            >
                              {ticket.roomId?.name}
                            </Typography>
                            <Typography variant="body1">
                              Price: ${ticket.roomId?.price}
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </Box>
                  );
                })}
              </>
            )}
          </Stack>
        </Box>
      </Stack>
    ),
    sx: {
      width: {
        sm: "80vw !important",
        md: "70vw !important",
        lg: "60vw !important",
        "@media (max-width: 743px)": {
          width: "90vw !important",
        },
      },
      height: {
        xs: "70% !important",
        lg: "80vh !important",
      },
      position: "absolute",
      overflow: "hidden",
      margin: "0 auto !important",
      padding: { xs: 2, sm: 2, md: 3 },
      borderRadius: "20px",
      backgroundColor: "white",
      top: "50% !important",
      left: "50%",
      transform: "translate(-50%, -50%) !important",
    },
    icon: <CloseIcon />,
  };

  const viewAll = (): void => {
    handleOpenModal();

    if (!ticketsByUser.length) {
      dispatch(getTicketsByUser({ userId: user._id }));
    }
  };

  const {
    register,
    handleSubmit,
    resetField,
    clearErrors: clearErrorsAvatar,
    formState: { errors: avataError },
  } = useForm<AvataForm>({ mode: "onChange" });

  const clearFile = () => {
    setPreview(null);
    setIsChangeAvatar(false);
    clearErrorsAvatar("avatar");
    resetField("avatar");
  };

  const onSubmitUpdateAvatar: SubmitHandler<AvataForm> = (file) => {
    const formData = new FormData();
    if (file.avatar.length) {
      formData.append("avatar", file.avatar[0], file.avatar[0].name);
      dispatch(updateUserAvatar(formData));
      clearFile();
    }
  };

  const updateInfoSchema = yup.object().shape({
    name: yup
      .string()
      .required("Please fill in the name!")
      .matches(
        /^[a-zA-Z_??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\ ]+$/,
        "Name must contains only letters"
      )
      .default(user.name),
    email: yup
      .string()
      .required("Please fill in email!")
      .email("Wrong email format!")
      .default(user.email),
    phone: yup
      .string()
      .required("Please fill in the phone number!")
      .matches(/^[0-9]+$/, "Phone must contains only number")
      .default(user.phone),
    address: yup
      .string()
      .required("Please fill in the address!")
      .default(user.address),
    birthday: yup
      .date()
      .required("Please fill your birthday!")
      .typeError("Invalid birthday!")
      .min(new Date("1990/01/01"), "DOB cannot be before 1990")
      .max(
        new Date(),
        `DOB cannot be greater than ${moment(new Date()).format("YYYY/MM/DD")}`
      )
      .default(user.birthday),
    gender: yup.boolean().default(user.gender),
    type: yup.string().required().default(user.type),
  });

  const {
    handleSubmit: handleSubmitUpdateInfo,
    control,
    formState: { errors: errorsUpdateInfo },
    setError: setErrorUpdateInfo,
    clearErrors: clearErrorsUpdateInfo,
    reset: resetUpdateInfo,
  } = useForm<UpdateInfoForm>({
    resolver: yupResolver(updateInfoSchema),
    mode: "onBlur",
    defaultValues: {
      name: user.name,
      address: user.address,
      birthday: user.birthday,
      email: user.email,
      gender: user.gender,
      type: user.type,
      phone: user.phone,
    },
  });

  const onSubmitUpdateInfo: SubmitHandler<UpdateInfoForm> = (value) => {
    // console.log(value);
    dispatch(
      updateUserInfo({
        userId: user._id,
        value: { ...value, birthday: moment(value.birthday).toISOString() },
      })
    );
  };

  const onErrorUpdateInfo: SubmitErrorHandler<UpdateInfoForm> = (error) => {
    toast.error("Check your field before update!", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "light",
      closeOnClick: true,
      pauseOnHover: true,
      autoClose: 1000,
    });
  };

  useEffect(() => {
    if (!Boolean(Object.keys(user).length)) {
      const _id = JSON.parse(localStorage.getItem("_id") || "");
      const _token = JSON.parse(localStorage.getItem("token") || "") || token;
      if (_id && _token) {
        dispatch(getUserDetail(_id));
      }
    }

    if (userActionSuccess) {
      dispatch(resetUserActionStatus());
      setPreview(null);
      dispatch(getUserDetail(user._id));
    }

    if (error) {
      dispatch(resetUserActionStatus());
    }
  }, [user, userActionSuccess, error]);

  // If no userDetail in Redux store => show loading
  if (!Object.keys(user).length) {
    return (
      <Stack sx={{ minHeight: "100vh" }}>
        <Header variant="profile" />
        <section>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              padding: {
                lg: "0 167px",
              },
            }}
          >
            <Container>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                gap={2}
                paddingTop={2}
                paddingBottom={2}
              >
                <Box sx={{ width: "100%" }}>
                  <Loading css={{ height: "50vh" }} />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Loading css={{ height: "50vh" }} />
                </Box>
              </Stack>
            </Container>
          </Box>
        </section>
        <Footer variant="detail" />
      </Stack>
    );
  }

  // if user Detail in redux -> show JSX
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header variant="profile" />
      <section>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            padding: {
              lg: "0 167px",
            },
          }}
        >
          <Container>
            <Box marginTop={1}>
              <Breadcrumbs>
                <Link to="/">
                  <Stack direction={"row"} alignItems="center">
                    <HomeIcon />
                    <Typography fontWeight={"700"}>Home</Typography>
                  </Stack>
                </Link>
                <p>Profile</p>
              </Breadcrumbs>
            </Box>
            <Stack direction={"row"} className={`${styles["profile"]}`}>
              <Box className={`${styles["profile-left"]}`}>
                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  padding={{ xs: "12px", sm: "25px 25px 40px" }}
                  sx={{ border: "1px solid #DDDDDD", borderRadius: "12px" }}
                >
                  <Box
                    sx={{ width: "100%", textAlign: "center" }}
                    paddingBottom={1}
                  >
                    {isDetailLoading || userActionPending ? (
                      <Loading
                        css={{
                          width: { xs: "80px", md: "128px" },
                          height: { xs: "80px", md: "128px" },
                          margin: "0 auto",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: { xs: "80px", md: "128px" },
                          height: { xs: "80px", md: "128px" },
                          margin: "0 auto",
                        }}
                        src={preview ?? user.avatar}
                      />
                    )}

                    <Box marginTop={2}>
                      <form
                        autoComplete="off"
                        noValidate
                        onSubmit={handleSubmit(onSubmitUpdateAvatar)}
                      >
                        <Button
                          size="small"
                          component="label"
                          disabled={isDetailLoading}
                        >
                          Change avatar
                          <input
                            hidden
                            accept="image/png, image/gif, image/jpeg, image/jpg"
                            type="file"
                            {...register("avatar", {
                              required: true,
                              onChange: (e) => {
                                if (e.target.files?.length !== 0) {
                                  const preview =
                                    e.currentTarget.files.length &&
                                    URL.createObjectURL(
                                      e.currentTarget.files[0]
                                    );
                                  setPreview(preview);
                                  setIsChangeAvatar(true);
                                } else {
                                  clearFile();
                                }
                              },
                            })}
                          />
                        </Button>
                        {isChangeAvatar && (
                          <>
                            <Button
                              size="small"
                              type="submit"
                              variant="outlined"
                            >
                              Update
                            </Button>
                            <IconButton onClick={clearFile}>
                              <CancelIcon />
                            </IconButton>
                          </>
                        )}
                        <FormHelperText
                          error={!!avataError.avatar}
                          children={avataError.avatar?.message}
                        />
                      </form>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      paddingBottom: "32px",
                      borderBottom: "1px solid #DDDDDD",
                    }}
                  >
                    <Stack rowGap={"17px"}>
                      <VerifiedUserOutlinedIcon />
                      {isDetailLoading ? (
                        <Loading />
                      ) : (
                        <h3>Identity verification</h3>
                      )}
                      {isDetailLoading ? (
                        <Loading height={40} />
                      ) : (
                        <p>
                          Show others you???re really you with the identity
                          verification badge.
                        </p>
                      )}
                    </Stack>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      paddingTop: "23px",
                    }}
                  >
                    <h3>
                      {isDetailLoading ? (
                        <Loading />
                      ) : (
                        <>
                          {user.name} <span>confirmed</span>
                        </>
                      )}
                    </h3>
                    <Box marginTop={2}>
                      <Stack alignItems={"center"} direction={"row"} gap={1}>
                        {isDetailLoading ? (
                          <Loading />
                        ) : (
                          <>
                            <CheckOutlinedIcon />
                            <p>Email address</p>
                          </>
                        )}
                      </Stack>
                    </Box>
                  </Box>
                </Stack>
              </Box>
              <Box className={`${styles["profile-right"]}`}>
                <Box>
                  <h1>Hi, I'm {user.name}</h1>
                </Box>
                <Box marginTop={3}>
                  <Box>
                    <Button
                      disabled={editFormVisible}
                      variant="outlined"
                      type="button"
                      onClick={() => setEditFormVisible(true)}
                    >
                      Edit Profile
                    </Button>
                  </Box>
                  <Box marginTop={5}>
                    <Box
                      sx={{ border: "1px solid #DDDDDD", borderRadius: "12px" }}
                      padding={2}
                      hidden={!editFormVisible}
                    >
                      <Box
                        component={"form"}
                        autoComplete="off"
                        noValidate
                        onSubmit={handleSubmitUpdateInfo(
                          onSubmitUpdateInfo,
                          onErrorUpdateInfo
                        )}
                      >
                        <Stack
                          rowGap={{ xs: 1, md: 2 }}
                          columnGap={2}
                          direction={{ md: "row" }}
                        >
                          <Stack
                            sx={{
                              width: {
                                xs: "100%",
                                md: "50%",
                              },
                            }}
                            rowGap={{ xs: 1, md: 2 }}
                          >
                            <Controller
                              name="name"
                              control={control}
                              defaultValue={user.name}
                              render={({ field: { ref, ...rest } }) => (
                                <TextField
                                  {...rest}
                                  inputRef={ref}
                                  required
                                  variant="outlined"
                                  size="medium"
                                  fullWidth
                                  InputLabelProps={{ shrink: true }}
                                  label="Name"
                                  margin="dense"
                                  error={!!errorsUpdateInfo.name}
                                  helperText={errorsUpdateInfo.name?.message}
                                  onFocus={() => {
                                    // authError && clearErrors();
                                  }}
                                />
                              )}
                            />
                            <Controller
                              name="email"
                              control={control}
                              defaultValue={user.email}
                              render={({ field: { ref, onBlur, ...rest } }) => (
                                <TextField
                                  {...rest}
                                  inputRef={ref}
                                  required
                                  variant="outlined"
                                  size="medium"
                                  fullWidth
                                  InputLabelProps={{ shrink: true }}
                                  label="Email"
                                  margin="dense"
                                  error={!!errorsUpdateInfo.email}
                                  helperText={errorsUpdateInfo.email?.message}
                                  onBlur={(e) => {
                                    onBlur();
                                    clearErrorsUpdateInfo();
                                  }}
                                  onFocus={() => {
                                    // authError && clearErrors();
                                  }}
                                />
                              )}
                            />

                            <Controller
                              name="phone"
                              control={control}
                              defaultValue={user.phone}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  variant="outlined"
                                  label="Phone"
                                  fullWidth
                                  size="medium"
                                  required
                                  InputLabelProps={{ shrink: true }}
                                  margin="dense"
                                  error={!!errorsUpdateInfo.phone}
                                  helperText={errorsUpdateInfo.phone?.message}
                                  onFocus={() => {
                                    // authError && clearErrors();
                                  }}
                                />
                              )}
                            />
                          </Stack>
                          <Stack
                            sx={{ xs: "100%", md: "50%" }}
                            rowGap={{ xs: 1, md: 2 }}
                          >
                            <Controller
                              name="birthday"
                              control={control}
                              defaultValue={user.birthday}
                              render={({
                                field: { onChange, value, ref, ...rest },
                              }) => (
                                <LocalizationProvider
                                  dateAdapter={AdapterMoment}
                                >
                                  <DatePicker
                                    inputFormat="YYYY/MM/DD"
                                    label="Birthday"
                                    onChange={(e) => {
                                      onChange(e);
                                      clearErrorsUpdateInfo("birthday");
                                    }}
                                    value={value}
                                    inputRef={ref}
                                    {...rest}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        margin="dense"
                                        required
                                        size="medium"
                                        helperText={
                                          errorsUpdateInfo.birthday?.message
                                        }
                                        error={!!errorsUpdateInfo?.birthday}
                                        InputLabelProps={{ shrink: true }}
                                      />
                                    )}
                                  />
                                </LocalizationProvider>
                              )}
                            />

                            <Stack direction={"row"} alignItems="center">
                              <Box>
                                <FormLabel children={"Male"} />
                                <Controller
                                  name="gender"
                                  control={control}
                                  defaultValue={user.gender}
                                  render={({ field: { value, ...rest } }) => (
                                    <Checkbox checked={value} {...rest} />
                                  )}
                                />
                              </Box>
                              <Stack
                                flexGrow={1}
                                direction={"row"}
                                alignItems="center"
                                gap={1}
                              >
                                <FormLabel children={"Type"} />
                                <Controller
                                  name="type"
                                  control={control}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      size="small"
                                      fullWidth
                                      label="Type"
                                      defaultValue={user.type}
                                    >
                                      <MenuItem
                                        disabled={user.type === "CLIENT"}
                                        value={"ADMIN"}
                                      >
                                        ADMIN
                                      </MenuItem>
                                      <MenuItem value={"CLIENT"}>
                                        CLIENT
                                      </MenuItem>
                                    </Select>
                                  )}
                                />
                              </Stack>
                            </Stack>

                            <Controller
                              name="address"
                              control={control}
                              defaultValue={user.address}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  required
                                  variant="outlined"
                                  size="medium"
                                  fullWidth
                                  InputLabelProps={{ shrink: true }}
                                  label="Address"
                                  margin="dense"
                                  error={!!errorsUpdateInfo.address}
                                  helperText={errorsUpdateInfo.address?.message}
                                  onFocus={() => {
                                    // authError && clearErrors();
                                  }}
                                />
                              )}
                            />
                          </Stack>
                        </Stack>

                        <Stack
                          direction={"row"}
                          justifyContent="space-between"
                          alignItems={"center"}
                          gap={3}
                          marginTop={2}
                        >
                          <Button
                            variant="contained"
                            type="submit"
                            size="large"
                            sx={{
                              color: "white !important",
                              backgroundColor: "#ff385c",
                              "&:hover": {
                                backgroundColor: "#ff385c !important",
                                opacity: 0.9,
                              },
                            }}
                          >
                            Update
                          </Button>
                        </Stack>
                      </Box>
                    </Box>
                    <Box marginTop={3} hidden={!editFormVisible}>
                      <Button
                        variant="contained"
                        color="inherit"
                        type="button"
                        onClick={() => {
                          setEditFormVisible(false);
                          clearErrorsUpdateInfo();
                          resetUpdateInfo({}, { keepDefaultValues: true });
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  columnGap={3}
                  rowGap={3}
                  marginTop={3}
                >
                  <Box
                    borderTop={"1px solid rgba(0,0,0,0.1)"}
                    paddingTop={2}
                    paddingBottom={2}
                  >
                    <h3>My tickets</h3>
                    <Box marginTop={3}>
                      <Button variant="outlined" onClick={viewAll}>
                        View all tickets
                      </Button>
                    </Box>
                  </Box>
                  <Box
                    borderTop={"1px solid rgba(0,0,0,0.1)"}
                    paddingTop={2}
                    paddingBottom={2}
                  >
                    <h3>My reviews</h3>
                    <Box marginTop={3}>
                      <Button disabled variant="outlined" onClick={viewAll}>
                        View all reviews
                      </Button>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Container>
          <PopModal
            open={isModalOpen}
            // open={true}
            onClose={handleCloseModal}
            css={modalProperties.sx}
            icon={modalProperties.icon}
            iconRight={"5% !important"}
            children={modalProperties.element}
          />
        </Box>
      </section>
      <Footer variant="detail" />
    </Stack>
  );
};

export default Profile;
