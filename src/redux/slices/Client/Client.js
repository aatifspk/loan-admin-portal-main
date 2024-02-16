import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const authToken = localStorage.getItem("token");

export const client = createAsyncThunk("client", async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/admin/getAllActiveUndeletedClinets`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log("clientList log",response);
    return response;
  } catch (error) {
    throw error;
  }
});
const clientSlice = createSlice({
  name: "clientSlice",
  initialState: {
    loading: false,
    clientList: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(client.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(client.fulfilled, (state, action) => {
      state.loading = false;
      state.clientList = action.payload;
    });
    builder.addCase(client.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default clientSlice.reducer;
