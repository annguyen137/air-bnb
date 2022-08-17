import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Location } from "interfaces/location";
import locationAPI from "services/locationAPI";

interface LocationsState {
  data: Location[];
  isLoading: boolean;
  error: string;
}

const initialState: LocationsState = {
  data: [],
  isLoading: false,
  error: "",
};

export const getLocationList = createAsyncThunk("locations/getLocationList", async () => {
  try {
    const data = await locationAPI.getLocationList();
    return data;
  } catch (error) {
    throw error;
  }
});

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLocationList.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(getLocationList.fulfilled, (state, { payload }) => ({ ...state, isLoading: false, data: payload }));
    builder.addCase(getLocationList.rejected, (state, { error }) => ({
      ...state,
      isLoading: false,
      error: error.message as string,
    }));
  },
});

export default locationsSlice.reducer;
