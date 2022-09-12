import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LocationId } from "interfaces/location";
import locationAPI from "services/locationAPI";

interface LocationsState {
  locationsData: LocationId[];
  locationDetail: LocationId;
  isLoading: boolean;
  error: string;
}

const initialState: LocationsState = {
  locationsData: [],
  locationDetail: {} as LocationId,
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

export const getLocationDetail = createAsyncThunk(
  "locations/getLocationDetail",
  async (locationId: LocationId["_id"]) => {
    try {
      const data = await locationAPI.getLocationDetail(locationId);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //location list
    builder.addCase(getLocationList.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(getLocationList.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      locationsData: payload,
    }));
    builder.addCase(getLocationList.rejected, (state, { error }) => ({
      ...state,
      isLoading: false,
      error: error.message as string,
    }));

    // location detail
    builder.addCase(getLocationDetail.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(getLocationDetail.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      locationDetail: payload,
    }));
    builder.addCase(getLocationDetail.rejected, (state, { error }) => ({
      ...state,
      isLoading: false,
      error: error.message as string,
    }));
  },
});

export default locationsSlice.reducer;
