import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const productInActive = createAsyncThunk(
  "productInActive",
  async ({ id, status }) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/admin/productInActive/${id}`,
        { status },
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

const productInActiveSlice = createSlice({
  name: "productInActiveSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(productInActive.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(productInActive.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(productInActive.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default productInActiveSlice.reducer;
