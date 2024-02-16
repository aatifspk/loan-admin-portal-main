import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const authToken = localStorage.getItem("token");
export const createProductInfo = createAsyncThunk(
  "createProductInfo",
  async (productData) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/admin/createproductInfo`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response, "redux response");
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error, "redux error");
      throw error;
    }
  }
);

const createProductInfoSlice = createSlice({
  name: "createProductInfoSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(createProductInfo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createProductInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(createProductInfo.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default createProductInfoSlice.reducer;
