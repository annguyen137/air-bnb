import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.scss";
import {
  Box,
  Container,
  IconButton,
  TextField,
  Button,
  Stack,
  Checkbox,
  FormLabel,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useForm, Controller, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignUpValue } from "interfaces/auth";
import { RootState, AppDispatch } from "redux/store";
import { resetAuthActionStatus, signup } from "redux/slices/authSlice";
import { toast } from "react-toastify";
import useIsFirstLoad from "utils/useIsFirstLoad";
import moment from "moment";

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { isFirstLoad, setIsFirstLoad } = useIsFirstLoad();

  const [showPass, setShowPass] = useState(false);

  const { pending, success, authError } = useSelector((state: RootState) => state.auth);

  const signupSchema = yup.object().shape({
    name: yup
      .string()
      .required("Please fill in the name!")
      .matches(
        /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/,
        "Name must contains only letters"
      )
      .default(""),
    email: yup.string().required("Please fill in email!").email("Wrong email format!").default(""),
    password: yup
      .string()
      .required("Please fill in the password!")
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/, "Weak password!")
      .default(""),
    phone: yup
      .string()
      .required("Please fill in the phone number!")
      .matches(/^[0-9]+$/, "Phone must contains only number")
      .default(""),
    address: yup.string().required("Please fill in the address!").default(""),
    birthday: yup
      .date()
      .required("Please fill your birthday!")
      .typeError("Invalid birthday!")
      .test("errorType", "Invalid date!", (value) => {
        return moment(value?.toISOString()).isValid();
      })
      .min(new Date("1990/01/01"), "DOB cannot be before 1990")
      .max(new Date(), `DOB cannot be greater than ${moment(new Date()).format("YYYY/MM/DD")}`)
      .default(new Date()),
    gender: yup.boolean().default(false),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<SignUpValue>({
    resolver: yupResolver(signupSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      address: "",
      birthday: new Date(),
      email: "",
      gender: false,
      password: "",
      phone: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpValue> = (value) => {
    dispatch(signup(value));
  };

  const onError: SubmitErrorHandler<SignUpValue> = (error) => {
    // console.log(error);
    toast.error("Check your field first!", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "light",
      closeOnClick: true,
      pauseOnHover: true,
      autoClose: 1000,
    });
  };

  useEffect(() => {
    // AFTER FIRST RENDER SET IS FIRST LOAD TO FALSE, USE FOR SETTIMEOUT REDIRECT AFTER TOAST NOTIFICATION
    setIsFirstLoad(false);

    return () => {
      dispatch(resetAuthActionStatus());
      toast.dismiss();
    };
  }, []);

  useEffect(() => {
    // AFTER STATE SUCCESS CHANGE (MEANS SUCCESS SIGNUP) => SET TIME OUT REDIRECT TO LOGIN PAGE AND RUN THE ABOVE EFFECT CLEAN UP.
    // THIS HELP CLEAR ACTION STATE
    if (success) {
      reset({}, { keepDefaultValues: true });
      dispatch(resetAuthActionStatus());
      clearErrors();
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }

    // SET RESPONSED ERROR FROM BACKEND API TO FORM IF ANY
    if (authError) {
    }
  }, [authError, success]);

  // WHEN FIRST LOAD, IF NO LOCALSTORAGE/SESSIONSTORAGE => SKIP
  // ELSE REDIRECT TO HOME IF USER IS LOGGED IN BUT TRY TO ACCESS SIGNUP ROUTE AGAIN
  // ONLY ALLOW USER TO ACCESS SIGNUP ROUTE AFTER LOG OUT
  if (isFirstLoad) {
    if (Boolean(localStorage.getItem("token")) || Boolean(sessionStorage.getItem("token"))) {
      return <Navigate to={"/"} replace={true} />;
    }
  }

  return (
    <Box className={`${styles["signup-form"]}`}>
      <Container>
        <Box className={`${styles["form-inner"]}`}>
          <Box className={`${styles["form"]}`}>
            <Box className={`${styles["form-title"]}`}>
              <h1>Sign Up</h1>
            </Box>
            <Box component={"form"} autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit, onError)}>
              <Stack rowGap={{ xs: 1, md: 2 }} columnGap={2} direction={{ md: "row" }}>
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
                    defaultValue={""}
                    render={({ field }) => (
                      <TextField
                        required
                        variant="outlined"
                        size="medium"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="Name"
                        margin="dense"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        onFocus={() => {
                          authError && clearErrors();
                        }}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <TextField
                        required
                        variant="outlined"
                        size="medium"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="Email"
                        margin="dense"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        onFocus={() => {
                          authError && clearErrors();
                        }}
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    name="password"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        label="Password"
                        fullWidth
                        size="medium"
                        required
                        InputLabelProps={{ shrink: true }}
                        margin="dense"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPass(!showPass)}
                                edge="end"
                              >
                                {showPass ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        type={showPass ? "text" : "password"}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        onFocus={() => {
                          authError && clearErrors();
                        }}
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    name="phone"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        label="Phone"
                        fullWidth
                        size="medium"
                        required
                        InputLabelProps={{ shrink: true }}
                        margin="dense"
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        onFocus={() => {
                          authError && clearErrors();
                        }}
                        {...field}
                      />
                    )}
                  />
                </Stack>
                <Stack sx={{ xs: "100%", md: "50%" }} rowGap={{ xs: 1, md: 2 }}>
                  <Controller
                    name="birthday"
                    control={control}
                    render={({ field: { onChange, value, ref, ...rest } }) => (
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          {...rest}
                          inputFormat="YYYY/MM/DD"
                          label="Birthday"
                          onChange={(e) => {
                            onChange(e);
                            // clearErrors("birthday");
                          }}
                          value={value}
                          inputRef={ref}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              margin="dense"
                              required
                              size="medium"
                              helperText={errors.birthday?.message}
                              error={!!errors?.birthday}
                              InputLabelProps={{ shrink: true }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    )}
                  />

                  <Stack direction={"row"} alignItems="center">
                    <FormLabel children={"Male"} />
                    <Controller
                      name="gender"
                      control={control}
                      defaultValue={true}
                      render={({ field: { value, ...rest } }) => <Checkbox checked={value} {...rest} />}
                    />
                  </Stack>

                  <Controller
                    name="address"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <TextField
                        required
                        variant="outlined"
                        size="medium"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="Address"
                        margin="dense"
                        error={!!errors.address}
                        helperText={errors.address?.message}
                        onFocus={() => {
                          authError && clearErrors();
                        }}
                        {...field}
                      />
                    )}
                  />
                </Stack>
              </Stack>

              <Stack direction={"row"} justifyContent="space-between" alignItems={"center"} gap={3} marginTop={2}>
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  disabled={pending}
                  sx={{
                    color: "white !important",
                    backgroundColor: "#ff385c",
                    "&:hover": { backgroundColor: "#ff385c !important", opacity: 0.9 },
                  }}
                >
                  Sign Up
                </Button>
                <span>
                  Already have an account?{" "}
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: "#ff385c",
                      hover: {
                        borderColor: "#ff385c !important",
                      },
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Login now
                  </Button>
                </span>
              </Stack>
              <FormHelperText error children={authError} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;
