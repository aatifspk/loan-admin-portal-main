import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const restoreProduct = createAsyncThunk("restoreProduct", async (id) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/admin/productRestore/${id}`,
      {},
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
});

const restoreProductSlice = createSlice({
  name: "restoreProductSlice",
  initialState: {
    loading: false,
    restoreProductData: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(restoreProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(restoreProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.restoreProductData = action.payload;
    });
    builder.addCase(restoreProduct.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default restoreProductSlice.reducer;
