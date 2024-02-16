import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const filterBranch = createAsyncThunk(
  "filterBranch",
  async (keyWord) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/getBranchsList?keyword=${keyWord}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("filterBranch", keyWord);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const filterBranchSlice = createSlice({
  name: "filterBranchSlice",
  initialState: {
    loading: false,
    filterData: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(filterBranch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(filterBranch.fulfilled, (state, action) => {
      state.filterData = action.payload;
    });
    builder.addCase(filterBranch.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default filterBranchSlice.reducer;
