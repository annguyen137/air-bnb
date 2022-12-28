import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import {
    Box,
    Container,
    IconButton,
    TextField,
    Button,
    Stack,
    Checkbox,
    InputLabel,
    InputAdornment,
    FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
    useForm,
    Controller,
    SubmitHandler,
    SubmitErrorHandler,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoginValue } from "interfaces/auth";
import { RootState, AppDispatch } from "redux/store";
import { login, resetAuthActionStatus } from "redux/slices/authSlice";
import { toast } from "react-toastify";
import useIsFirstLoad from "utils/useIsFirstLoad";

type Props = {
    modalMode?: boolean;
};

const Login = ({ modalMode }: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const { isFirstLoad, setIsFirstLoad } = useIsFirstLoad();

    const [showPass, setShowPass] = useState(false);

    const { pending, success, authError } = useSelector(
        (state: RootState) => state.auth
    );

    const loginSchema = yup.object().shape({
        email: yup
            .string()
            .required("Email is required!")
            .email("Wrong email format!")
            .default(""),
        password: yup.string().required("Password is required!").default(""),
        isRemember: yup.boolean().default(false),
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
        setError,
        clearErrors,
        reset,
        setFocus,
    } = useForm<LoginValue>({
        resolver: yupResolver(loginSchema),
        mode: modalMode ? "onSubmit" : "onBlur",
        reValidateMode: "onBlur",
    });

    const onSubmit: SubmitHandler<LoginValue> = (value) => {
        dispatch(login(value));
    };

    const onError: SubmitErrorHandler<LoginValue> = (error) => {
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

        if (!Boolean(localStorage.getItem("token"))) {
            setFocus("email");
        }

        return () => {
            dispatch(resetAuthActionStatus());
        };
    }, []);

    useEffect(() => {
        // AFTER STATE SUCCESS CHANGE (MEANS SUCCESS LOGIN) => SET TIME OUT REDIRECT TO HOME PAGE AND RUN THE ABOVE EFFECT CLEAN UP.
        // THIS HELP CLEAR STATE AND PREVENT USER TRY TO ACCESS LOGIN ROUTE AGAIN
        if (success) {
            reset({}, { keepDefaultValues: true });
            dispatch(resetAuthActionStatus());
            clearErrors();
            if (!modalMode) {
                setTimeout(() => {
                    navigate("/", { replace: true });
                }, 1000);
            }
        }

        if (authError) {
            if (authError === "Không tìm thấy email phù hợp") {
                setFocus("email");
                setError(
                    "email",
                    { type: "manual", message: authError },
                    { shouldFocus: true }
                );
            } else if (authError === "Tài khoãng hoặc mật khẩu không đúng") {
                setError(
                    "email",
                    { type: "manual", message: authError },
                    { shouldFocus: false }
                );
                setError(
                    "password",
                    { type: "manual", message: authError },
                    { shouldFocus: false }
                );
            }
        }
    }, [authError, success]);

    // WHEN FIRST LOAD, IF NO LOCALSTORAGE/SESSIONSTORAGE => SKIP
    // ELSE REDIRECT TO HOME IF USER IS LOGGED IN BUT TRY TO ACCESS LOGIN ROUTE AGAIN
    if (isFirstLoad) {
        if (
            Boolean(localStorage.getItem("token")) ||
            Boolean(sessionStorage.getItem("token"))
        ) {
            return <Navigate to={"/"} replace={true} />;
        }
    }

    return (
        <Box
            className={`${styles["login-form"]} ${
                modalMode && styles["--no-bg"]
            }`}
        >
            <Container>
                <Box className={`${styles["form-inner"]}`}>
                    <Box
                        className={`${styles["form"]} ${
                            modalMode && styles["--modal-mode"]
                        }`}
                    >
                        <Box className={`${styles["form-title"]}`}>
                            <h1>Login</h1>
                        </Box>
                        <Box
                            component={"form"}
                            autoComplete="off"
                            noValidate
                            onSubmit={handleSubmit(onSubmit, onError)}
                        >
                            <Stack rowGap={{ xs: 1, md: 2 }}>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { ref, ...rest } }) => (
                                        <TextField
                                            required
                                            variant="outlined"
                                            size="medium"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            label="Email"
                                            margin="dense"
                                            inputRef={ref}
                                            error={!!errors?.email}
                                            helperText={errors.email?.message}
                                            onFocus={() => {
                                                authError && clearErrors();
                                            }}
                                            {...rest}
                                        />
                                    )}
                                />

                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { ref, ...rest } }) => (
                                        <TextField
                                            variant="outlined"
                                            label="Password"
                                            fullWidth
                                            size="medium"
                                            required
                                            InputLabelProps={{ shrink: true }}
                                            margin="dense"
                                            inputRef={ref}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() =>
                                                                setShowPass(
                                                                    !showPass
                                                                )
                                                            }
                                                            edge="end"
                                                        >
                                                            {showPass ? (
                                                                <VisibilityOff />
                                                            ) : (
                                                                <Visibility />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            type={
                                                showPass ? "text" : "password"
                                            }
                                            error={!!errors?.password}
                                            helperText={
                                                errors.password?.message
                                            }
                                            onFocus={() => {
                                                authError && clearErrors();
                                            }}
                                            {...rest}
                                        />
                                    )}
                                />
                            </Stack>

                            <Stack
                                direction={"row"}
                                alignItems="center"
                                marginTop={2}
                                marginBottom={2}
                            >
                                <Controller
                                    name="isRemember"
                                    control={control}
                                    defaultValue={false}
                                    render={({ field }) => (
                                        <Checkbox {...field} />
                                    )}
                                />
                                <InputLabel>Remember password</InputLabel>
                            </Stack>

                            <Stack
                                direction={"row"}
                                justifyContent="space-between"
                                gap={2}
                                marginBottom={2}
                            >
                                <Button
                                    variant="contained"
                                    type="submit"
                                    size="large"
                                    disabled={pending}
                                    sx={{
                                        width: { xs: "100%", md: "50%" },
                                        color: "white !important",
                                        backgroundColor: "#ff385c",
                                        "&:hover": {
                                            backgroundColor:
                                                "#ff385c !important",
                                            opacity: 0.9,
                                        },
                                    }}
                                >
                                    Login
                                </Button>
                                <Stack direction={"row"}>
                                    <span>
                                        Don't have an account?
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                borderColor: "#ff385c",
                                                hover: {
                                                    borderColor:
                                                        "#ff385c !important",
                                                },
                                            }}
                                            onClick={() => navigate("/signup")}
                                        >
                                            Signup now
                                        </Button>
                                    </span>
                                </Stack>
                            </Stack>
                            <FormHelperText error children={authError} />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;
