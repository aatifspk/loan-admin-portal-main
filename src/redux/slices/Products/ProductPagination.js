import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const productPagination = createAsyncThunk(
  "productPagination",
  async ({ page, keyWord, perPage }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/getProductsList?keyWord=${keyWord}&page=${page}&perPage=${perPage}`,
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
const productPaginationSlice = createSlice({
  name: "productPaginationSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(productPagination.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(productPagination.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(productPagination.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});
export default productPaginationSlice.reducer;
