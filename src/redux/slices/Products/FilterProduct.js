import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const filterProduct = createAsyncThunk(
  "filterProduct",
  async (keyWord) => {
    console.log(keyWord);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/getProductsList?keyword=${keyWord}`,
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

const filterProductSlice = createSlice({
  name: "filterProductSlice",
  initialState: {
    loading: false,
    products: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(filterProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(filterProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(filterProduct.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default filterProductSlice.reducer;
