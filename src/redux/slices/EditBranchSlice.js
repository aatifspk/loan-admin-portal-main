import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const editBranch = createAsyncThunk("editBranch", async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/admin/getBranch/${id}`,
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
});

const editBranchSlice = createSlice({
  name: "editBranchSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(editBranch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(editBranch.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(editBranch.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default editBranchSlice.reducer;
