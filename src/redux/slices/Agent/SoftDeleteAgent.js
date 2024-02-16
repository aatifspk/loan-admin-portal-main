import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const softDeleteAgent = createAsyncThunk(
  "softDeleteAgent",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/admin/deleteAgent/${id}`,
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

const softDeleteAgentSlice = createSlice({
  name: "softDeleteAgentSlice",
  initialState: {
    loading: false,
    deletedAgent: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(softDeleteAgent.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(softDeleteAgent.fulfilled, (state, action) => {
      state.loading = true;
      state.deletedAgent = action.payload;
    });
    builder.addCase(softDeleteAgent.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default softDeleteAgentSlice.reducer;
