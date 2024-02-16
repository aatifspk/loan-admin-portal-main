import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const restoreClient = createAsyncThunk("restoreClient", async (id) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/admin/clientRestore/${id}`,
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

const restoreClientSlice = createSlice({
  name: "restoreClientSlice",
  initialState: {
    loading: false,
    restoreClientData: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(restoreClient.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(restoreClient.fulfilled, (state, action) => {
      state.loading = false;
      state.restoreClientData = action.payload;
    });
    builder.addCase(restoreClient.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default restoreClientSlice.reducer;
