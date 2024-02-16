import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const getSoftDeleteAgentList = createAsyncThunk(
  "getSoftDeleteAgentList",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/getSoftDeleteAgentsList`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const getSoftDeleteAgentListSlice = createSlice({
  name: "getSoftDeleteAgentListSlice",
  initialState: {
    loading: false,
    deletedAgentList: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getSoftDeleteAgentList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSoftDeleteAgentList.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedAgentList = action.payload;
    });
    builder.addCase(getSoftDeleteAgentList.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default getSoftDeleteAgentListSlice.reducer;
