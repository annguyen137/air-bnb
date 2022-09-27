import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import { LoginValue, SignUpValue } from "interfaces/auth";
import { User } from "interfaces/user";
import authAPI from "services/authAPI";
import userAPI from "services/userAPI";
import { toast, ToastItem } from "react-toastify";

interface authState {
  user: User;
  token: string;
  message: string;
  success: boolean;
  pending: boolean;
  isDetailLoading: boolean;
  authError: string;
}

const initialState: authState = {
  user: {} as User,
  token: (localStorage.getItem("token") && JSON.parse(localStorage.getItem("token") || "")) || "",
  message: "",
  success: false,
  pending: false,
  isDetailLoading: false,
  authError: "",
};

let noti: ToastItem["id"];

export const login = createAsyncThunk("auth/login", async ({ email, password, isRemember }: LoginValue) => {
  try {
    const data = await authAPI.login({ email, password });

    const { user, token } = data;

    if (isRemember) {
      localStorage.setItem("_id", JSON.stringify(user?._id));
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("r", JSON.stringify(true));
      return data;
    }

    localStorage.setItem("_id", JSON.stringify(user?._id));
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("r", JSON.stringify(false));

    return data;
  } catch (error) {
    throw error;
  }
});

export const signup = createAsyncThunk("auth/signup", async (signUpValue: SignUpValue) => {
  try {
    const data = await authAPI.signup(signUpValue);
    return data;
  } catch (error) {
    throw error;
  }
});

export const getUserDetail = createAsyncThunk("auth/getUserDetail", async (userId: User["_id"]) => {
  try {
    const data = await userAPI.getUserDetail(userId);
    return data;
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      return { ...state, ...initialState };
    },
    resetAuthActionStatus: (state) => {
      return { ...state, pending: false, success: false, authError: "", message: "" };
    },
    logout: (state) => {
      localStorage.clear();
      sessionStorage.clear();
      return { ...state, user: {} as User, token: "" };
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state) => {
      noti = toast.loading("Loggin in ...!", { isLoading: true, closeOnClick: false });

      state.pending = true;
    });

    builder.addCase(login.fulfilled, (state, { payload }) => {
      toast.update(noti, { render: payload.message, type: "success", isLoading: false, autoClose: 1000 });

      state.pending = false;
      state.success = true;
      state.user = payload.user as User;
      state.token = payload.token as string;
      state.message = payload.message as string;
      state.authError = "";
    });

    builder.addCase(login.rejected, (state, { error }) => {
      toast.update(noti, { render: error.message, type: "error", isLoading: false, autoClose: 1000 });

      state.pending = false;
      state.success = false;
      state.message = "";
      state.authError = error.message as string;
    });

    // signup
    builder.addCase(signup.pending, (state) => {
      noti = toast.loading("Signing you up ...!", { isLoading: true, closeOnClick: false });

      state.pending = true;
    });

    builder.addCase(signup.fulfilled, (state) => {
      toast.update(noti, {
        render: "Sign Up Success! Ridirect to Login",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });

      state.pending = false;
      state.success = true;
    });

    builder.addCase(signup.rejected, (state, { error }) => {
      toast.update(noti, { render: error.message, type: "error", isLoading: false, autoClose: 1000 });

      state.pending = false;
      state.success = false;
      state.authError = error.message as string;
    });

    // get userDetail
    builder.addCase(getUserDetail.pending, (state) => {
      state.isDetailLoading = true;
    });
    builder.addCase(getUserDetail.fulfilled, (state, { payload }) => {
      state.isDetailLoading = false;
      state.user = payload;
    });
    builder.addCase(getUserDetail.rejected, (state, { error }) => {
      state.isDetailLoading = false;
      state.user = {} as User;
      state.authError = error.message as string;
    });
  },
});

export default authSlice.reducer;

export const { resetAuth, resetAuthActionStatus, logout } = authSlice.actions;
