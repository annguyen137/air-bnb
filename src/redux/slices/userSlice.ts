import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "services/userAPI";
import { UpdateInfoValue, User } from "interfaces/user";
import { toast, ToastItem } from "react-toastify";

interface UserState {
  userActionPending: boolean;
  userActionSuccess: boolean;
  message: string;
  error: string;
}

const initialState: UserState = {
  userActionPending: false,
  userActionSuccess: false,
  message: "",
  error: "",
};

let noti: ToastItem["id"];

export const updateUserAvatar = createAsyncThunk("user/updateUserAvatar", async (formData: FormData) => {
  try {
    const data = await userAPI.updateUserAvatar(formData);
    return data;
  } catch (error) {
    throw error;
  }
});

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async ({ userId, value }: { userId: User["_id"]; value: UpdateInfoValue }) => {
    try {
      const data = await userAPI.updateUserInfo(userId, value);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserActionStatus: (state) => {
      return { ...state, userActionPending: false, userActionSuccess: false, error: "" };
    },
  },
  extraReducers: (builder) => {
    // update avatar
    builder.addCase(updateUserAvatar.pending, (state) => {
      noti = toast.loading("Updating your new avatar...!", { isLoading: true });

      return { ...state, userActionPending: true };
    });

    builder.addCase(updateUserAvatar.fulfilled, (state) => {
      toast.update(noti, {
        render: "Succeed update your avatar!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
      });

      return {
        ...state,
        userActionPending: false,
        userActionSuccess: true,
      };
    });
    builder.addCase(updateUserAvatar.rejected, (state, { error, meta, payload, type }) => {
      toast.update(noti, {
        render: `${error.message} ${meta.arg} ${meta.aborted} ${meta.condition} ${meta.rejectedWithValue} ${meta.requestId} ${meta.requestStatus} ${payload} ${type}`,
        type: "error",
        isLoading: false,
        autoClose: false,
        closeOnClick: false,
        pauseOnHover: true,
      });

      return {
        ...state,
        userActionPending: false,
        userActionSuccess: false,
        error: error.message as string,
      };
    });

    // update info
    builder.addCase(updateUserInfo.pending, (state) => {
      noti = toast.loading("Updating your new information...!", { isLoading: true });

      return { ...state, userActionPending: true };
    });
    builder.addCase(updateUserInfo.fulfilled, (state) => {
      toast.update(noti, {
        render: "Succeed update your information!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
      });

      return { ...state, userActionPending: false, userActionSuccess: true };
    });
    builder.addCase(updateUserInfo.rejected, (state, { error }) => {
      toast.update(noti, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
      });

      return { ...state, userActionPending: false, userActionSuccess: true };
    });
  },
});

export default userSlice.reducer;

export const { resetUserActionStatus } = userSlice.actions;
