import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const pagination = createAsyncThunk(
  "pagination",
  async ({ page, keyWord, perPage }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/admin/getBranchsList?keyWord=${keyWord}&page=${page}&perPage=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
);
const paginationSlice = createSlice({
  name: "paginationSlice",
  initialState: {
    loading: false,
    branchesData: null,
    rowCount: 0,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(pagination.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(pagination.fulfilled, (state, action) => {
      state.branchesData = action.payload.listBranches;
      state.rowCount = action.payload.count;
    });
    builder.addCase(pagination.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default paginationSlice.reducer;
