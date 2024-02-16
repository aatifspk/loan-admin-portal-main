import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const permanentDeleteClient = createAsyncThunk(
  "permanentDeleteClient",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/admin/permanentDeleteClient/${id}`,
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

const permanentDeleteClientSlice = createSlice({
  name: "permanentDeleteClientSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(permanentDeleteClient.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(permanentDeleteClient.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
    });
    builder.addCase(permanentDeleteClient.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default permanentDeleteClientSlice.reducer;
