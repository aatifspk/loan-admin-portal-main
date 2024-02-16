import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const restoreBranch = createAsyncThunk("restoreBranch", async (id) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/admin/branchRestore/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log(id);
    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
const restoreBranchSlice = createSlice({
  name: "restoreBranchSlice",
  initialState: {
    loading: false,
    restoreData: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(restoreBranch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(restoreBranch.fulfilled, (state, action) => {
      state.restoreData = action.payload;
    });
    builder.addCase(restoreBranch.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default restoreBranchSlice.reducer;
