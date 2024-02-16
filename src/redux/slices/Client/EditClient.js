import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const editClient = createAsyncThunk("editClient", async (email) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/admin/createClient`,
      email,
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

const editClientSlice = createSlice({
  name: "editClientSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(editClient.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(editClient.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(editClient.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default editClientSlice.reducer;
