import { createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "services/userAPI";
import { User } from "interfaces/user";

export const getUserDetail = createAsyncThunk(
  "user/getUserDetail",
  async (userId: User["_id"], { dispatch, getState }) => {
    try {
      const data = await userAPI.getUserDetail(userId);
      return data;
    } catch (error) {
      throw error;
    }
  }
);
