import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const profile = createAsyncThunk("profile", async (payload) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/admin/adminProfile",
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log(response);

    return response;
  } catch (error) {
    console.log(error.response.data);
    console.log(error);
    throw error;
  }
});
const profileSlice = createSlice({
  name: "profileSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(profile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(profile.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(profile.rejected, (state, action) => {
      state.isError = true;
      console.log(state.isError);
    });
  },
});
export default profileSlice.reducer;
