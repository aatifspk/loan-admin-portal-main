import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const softDeleteProduct = createAsyncThunk(
  "softDeleteProduct",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/admin/deleteProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const softDeleteProductSlice = createSlice({
  name: "softDeleteProductSlice",
  initialState: {
    loading: false,
    deletedProduct: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(softDeleteProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(softDeleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedProduct = action.payload;
    });
    builder.addCase(softDeleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default softDeleteProductSlice.reducer;
