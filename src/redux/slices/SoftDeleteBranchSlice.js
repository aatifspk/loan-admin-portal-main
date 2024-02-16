import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const softDeleteBranch = createAsyncThunk(
  "softDeleteBranch",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/admin/deleteBranch/${id}`,
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

const softDeleteBranchSlice = createSlice({
  name: "softDeleteBranchSlice",
  initialState: {
    loading: false,
    deleteBranch: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(softDeleteBranch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(softDeleteBranch.fulfilled, (state, action) => {
      state.deleteBranch = action.payload;
    });
    builder.addCase(softDeleteBranch.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default softDeleteBranchSlice.reducer;
