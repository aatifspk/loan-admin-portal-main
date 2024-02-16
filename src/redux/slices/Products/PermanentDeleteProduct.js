import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const permanentDeleteProduct = createAsyncThunk(
  "permanentDeleteProduct",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/admin/permanentDeleteProduct/${id}`,
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

const permanentDeleteProductSlice = createSlice({
  name: "permanentDeleteProductSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(permanentDeleteProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(permanentDeleteProduct.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
    });
    builder.addCase(permanentDeleteProduct.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default permanentDeleteProductSlice.reducer;
