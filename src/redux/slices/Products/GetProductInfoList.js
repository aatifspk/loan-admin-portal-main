import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const getProductinfoList = createAsyncThunk(
  "getProductinfoList",
  async (id) => {
    console.log(id, "id");
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/getProductinfoList`,
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

const getProductinfoListSlice = createSlice({
  name: "getProductinfoListSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getProductinfoList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProductinfoList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getProductinfoList.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default getProductinfoListSlice.reducer;
