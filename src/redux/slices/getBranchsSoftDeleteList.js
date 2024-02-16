import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
const authToken = localStorage.getItem("token");

export const getBranchsSoftDeleteList = createAsyncThunk(
  "getBranchsSoftDeleteList",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/getBranchsSoftDeleteList",

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
const getBranchsSoftDeleteListSlice = createSlice({
  name: "getBranchsSoftDeleteList",
  initialState: {
    loading: false,
    deletedBranch: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getBranchsSoftDeleteList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getBranchsSoftDeleteList.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getBranchsSoftDeleteList.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default getBranchsSoftDeleteListSlice.reducer;
