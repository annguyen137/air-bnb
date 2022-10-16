import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LocationId, LocationQueryParams } from "interfaces/location";
import adminAPI from "services/adminAPI";

interface adminState {
  location: {
    locationList: LocationId[];
    locationDetail: LocationId;
    isLocationLoading: boolean;
    locationError: string;
  };
}

const initialState: adminState = {
  location: {
    locationList: [],
    locationDetail: {} as LocationId,
    isLocationLoading: false,
    locationError: "",
  },
};

export const getLocationList = createAsyncThunk(
  "admin/getLocationList",
  async ({ location, limit, skip }: LocationQueryParams) => {
    try {
      const data = await adminAPI.getLocationList({ location, limit, skip });
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getEditLocationDetail = createAsyncThunk(
  "admin/getEditLocationDetail",
  async (locationId: LocationId["_id"]) => {
    try {
      const data = await adminAPI.getEditLocation(locationId);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminLocationState: (state) => {
      state.location = {
        locationList: [],
        locationDetail: {} as LocationId,
        isLocationLoading: false,
        locationError: "",
      };
    },
    clearDetailLocation: (state) => {
      state.location.locationDetail = {} as LocationId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLocationList.pending, (state, { payload }) => {
      state.location.isLocationLoading = true;
    });

    builder.addCase(getLocationList.fulfilled, (state, { payload }) => {
      state.location.isLocationLoading = false;
      state.location.locationList = payload;
    });

    builder.addCase(getLocationList.rejected, (state, { error }) => {
      state.location.isLocationLoading = false;
      state.location.locationList = [];
      state.location.locationError = error.message as string;
    });
    //
    builder.addCase(getEditLocationDetail.pending, (state, { payload }) => {
      state.location.isLocationLoading = true;
    });

    builder.addCase(getEditLocationDetail.fulfilled, (state, { payload }) => {
      state.location.isLocationLoading = false;
      state.location.locationDetail = payload;
    });

    builder.addCase(getEditLocationDetail.rejected, (state, { error }) => {
      state.location.isLocationLoading = false;
      state.location.locationDetail = {} as LocationId;
      state.location.locationError = error.message as string;
    });
  },
});

export default adminSlice.reducer;

export const { clearAdminLocationState, clearDetailLocation } =
  adminSlice.actions;
