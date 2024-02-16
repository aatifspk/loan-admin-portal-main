import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const stateData = createAsyncThunk("getStateSliceData", async () => {
  try {
    const { data } = await axios.get("http://localhost:8080/api/getStates");

    return data;
  } catch (error) {
    throw error;
  }
});
const stateSlice = createSlice({
  name: "stateSlice",
  initialState: {
    loading: false,
    stateList: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(stateData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(stateData.fulfilled, (state, action) => {
      state.loading = false;
      state.stateList = action.payload;
    });
    builder.addCase(stateData.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default stateSlice.reducer;
