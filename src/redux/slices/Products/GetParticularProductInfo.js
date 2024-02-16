import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const getParticularProductInfo = createAsyncThunk(
  "getParticularProductInfo",
  async (id) => {
    console.log(id, "id");
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/getParticularProductInfo/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response, "redux response");
      return response;
    } catch (error) {
      console.log(error, "redux error");
      throw error;
    }
  }
);

const getParticularProductInfoSlice = createSlice({
  name: "getParticularProductInfoSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getParticularProductInfo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getParticularProductInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getParticularProductInfo.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default getParticularProductInfoSlice.reducer;
