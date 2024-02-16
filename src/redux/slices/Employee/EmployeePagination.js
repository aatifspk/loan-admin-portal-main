import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const employeePagination = createAsyncThunk(
  "employeePagination",
  async ({ page, keyWord, perPage }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/getEmployeesList?keyWord=${keyWord}&page=${page}&perPage=${perPage}`,
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
const employeePaginationSlice = createSlice({
  name: "employeePaginationSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(employeePagination.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(employeePagination.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(employeePagination.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});
export default employeePaginationSlice.reducer;
