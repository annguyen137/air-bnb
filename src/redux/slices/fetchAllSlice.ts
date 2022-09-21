import { AsyncThunkAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface fetchAllState {
  fetchAllLoading: boolean;
  fetchAllSuccess: boolean;
  fetchAllError: string;
}

const initialState: fetchAllState = {
  fetchAllLoading: false,
  fetchAllSuccess: false,
  fetchAllError: "",
};

export const fetchAll = createAsyncThunk("all/fetchAll", async (actions: Array<any>, { dispatch }) => {
  try {
    await Promise.all(actions.map((action) => dispatch(action)));
  } catch (error) {
    throw error;
  }
});

const fetchAllSlice = createSlice({
  name: "all",
  initialState,
  reducers: {
    resetFetchAllStatus: (state) => {
      return { ...state, ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAll.pending, (state) => {
      return { ...state, fetchAllLoading: true };
    });
    builder.addCase(fetchAll.fulfilled, (state) => {
      return { ...state, fetchAllLoading: false, fetchAllSuccess: true };
    });
    builder.addCase(fetchAll.rejected, (state, { error }) => {
      return {
        ...state,

        fetchAllLoading: false,
        fetchAllSuccess: false,
        fetchAllError: error.message as string,
      };
    });
  },
});

export default fetchAllSlice.reducer;

export const { resetFetchAllStatus } = fetchAllSlice.actions;
