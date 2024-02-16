import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const ClientInActive = createAsyncThunk(
  "ClientInActive",
  async ({ id, status }) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/admin/clientInActive/${id}`,
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

const ClientInActiveSlice = createSlice({
  name: "ClientInActiveSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(ClientInActive.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(ClientInActive.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(ClientInActive.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default ClientInActiveSlice.reducer;
