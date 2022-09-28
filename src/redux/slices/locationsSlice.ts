import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LocationId, LocationQueryParams } from "interfaces/location";
import locationAPI from "services/locationAPI";

interface LocationsState {
  locationsData: LocationId[];
  // locationsPagination: LocationId[];
  isLocationsLoading: boolean;
  locationDetail: LocationId;
  isLocationDetailLoading: boolean;
  error: string;
}

const initialState: LocationsState = {
  locationsData: [],
  // locationsPagination: [],
  locationDetail: {} as LocationId,
  isLocationsLoading: false,
  isLocationDetailLoading: false,
  error: "",
};

export const getLocationList = createAsyncThunk(
  "locations/getLocationList",
  async ({ location, skip, limit }: LocationQueryParams) => {
    try {
      const data = await locationAPI.getLocationList({ location, skip, limit });
      return data;
    } catch (error) {
      throw error;
    }
  }
);

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
  reducers: {
    resetLocationState: (state) => {
      return { ...state, ...initialState };
    },
  },
  extraReducers: (builder) => {
    //location list
    builder.addCase(getLocationList.pending, (state) => ({ ...state, isLocationsLoading: true }));
    builder.addCase(getLocationList.fulfilled, (state, { payload }) => ({
      ...state,
      isLocationsLoading: false,
      // locationsPagination: payload,
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

export const { resetLocationState } = locationsSlice.actions;
