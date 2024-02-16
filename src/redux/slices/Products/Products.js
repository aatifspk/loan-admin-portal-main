import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const authToken = localStorage.getItem("token");

export const product = createAsyncThunk("product", async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/admin/getProductsList`,
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
const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    loading: false,
    productList: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(product.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(product.fulfilled, (state, action) => {
      state.loading = false;
      state.productList = action.payload;
    });
    builder.addCase(product.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default productSlice.reducer;
