import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const branch = createAsyncThunk("branch", async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/admin/getBranchsList",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response;
    // return null;
  } catch (error) {
    throw error;
  }
});
const branchSlice = createSlice({
  name: "branchSlice",
  initialState: {
    loading: false,
    branchList: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(branch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(branch.fulfilled, (state, action) => {
      state.loading = false;
      state.branchList = action.payload.data.listBranches;
    });
    builder.addCase(branch.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default branchSlice.reducer;
