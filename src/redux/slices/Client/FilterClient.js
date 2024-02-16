import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const filterClient = createAsyncThunk(
  "filterClient",
  async (keyWord) => {
    console.log(keyWord);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/getClinetsList?keyword=${keyWord}`,
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

const filterClientSlice = createSlice({
  name: "filterClientSlice",
  initialState: {
    loading: false,
    client: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(filterClient.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(filterClient.fulfilled, (state, action) => {
      state.loading = false;
      state.client = action.payload;
    });
    builder.addCase(filterClient.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default filterClientSlice.reducer;
