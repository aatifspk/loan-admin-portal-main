import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const agentInActive = createAsyncThunk(
  "agentInActive",
  async ({ id, status }) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/admin/agentInActive/${id}`,
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

const agentInActiveSlice = createSlice({
  name: "agentInActiveSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(agentInActive.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(agentInActive.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(agentInActive.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default agentInActiveSlice.reducer;
