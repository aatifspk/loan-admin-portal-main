import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const getSoftDeletedProductsList = createAsyncThunk(
  "getSoftDeletedProductsList",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/getSoftDeletedProductsList`,
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

const getSoftDeletedProductsListSlice = createSlice({
  name: "getSoftDeletedProductsListSlice",
  initialState: {
    loading: false,
    deletedProductList: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getSoftDeletedProductsList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSoftDeletedProductsList.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedProductList = action.payload;
    });
    builder.addCase(getSoftDeletedProductsList.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default getSoftDeletedProductsListSlice.reducer;
