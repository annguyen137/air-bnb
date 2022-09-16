import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LocationId } from "interfaces/location";
import locationAPI from "services/locationAPI";

interface LocationsState {
  locationsData: LocationId[];
  isLocationsLoading: boolean;
  locationDetail: LocationId;
  isLocationDetailLoading: boolean;
  error: string;
}

const initialState: LocationsState = {
  locationsData: [],
  locationDetail: {} as LocationId,
  isLocationsLoading: false,
  isLocationDetailLoading: false,
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
    builder.addCase(getLocationList.pending, (state) => ({ ...state, isLocationsLoading: true }));
    builder.addCase(getLocationList.fulfilled, (state, { payload }) => ({
      ...state,
      isLocationsLoading: false,
      locationsData: payload,
    }));
    builder.addCase(getLocationList.rejected, (state, { error }) => ({
      ...state,
      isLoading: false,
      error: error.message as string,
    }));

    // location detail
    builder.addCase(getLocationDetail.pending, (state) => ({ ...state, isLocationDetailLoading: true }));
    builder.addCase(getLocationDetail.fulfilled, (state, { payload }) => ({
      ...state,
      isLocationDetailLoading: false,
      locationDetail: payload,
    }));
    builder.addCase(getLocationDetail.rejected, (state, { error }) => ({
      ...state,
      isLocationDetailLoading: false,
      error: error.message as string,
    }));
  },
});

export default locationsSlice.reducer;
