import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const softDeleteClinet = createAsyncThunk(
  "softDeleteClinet",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/admin/deleteClinet/${id}`,
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

const softDeleteClinetSlice = createSlice({
  name: "softDeleteClinetSlice",
  initialState: {
    loading: false,
    deletedClient: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(softDeleteClinet.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(softDeleteClinet.fulfilled, (state, action) => {
      state.loading = true;
      state.deletedClient = action.payload;
    });
    builder.addCase(softDeleteClinet.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default softDeleteClinetSlice.reducer;
