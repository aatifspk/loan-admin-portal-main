import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const inActiveBranch = createAsyncThunk(
  "inActiveBranch",
  async ({ id, status }) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/admin/branchInActive/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("redux status and id ", id, status);
      console.log(response);
      return response;
    } catch (error) {
      console.log("redux status and id ", id, status);
      console.log(error);
      throw error;
    }
  }
);

const inActiveBranchSlice = createSlice({
  name: "inActiveBranchSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(inActiveBranch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(inActiveBranch.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log(state.data, "status");
    });
    builder.addCase(inActiveBranch.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default inActiveBranchSlice.reducer;
