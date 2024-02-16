import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const restoreAgent = createAsyncThunk("restoreAgent", async (id) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/admin/agentRestore/${id}`,
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

const restoreAgentSlice = createSlice({
  name: "restoreAgentSlice",
  initialState: {
    loading: false,
    restoreAgentdata: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(restoreAgent.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(restoreAgent.fulfilled, (state, action) => {
      state.loading = false;
      state.restoreAgentdata = action.payload;
    });
    builder.addCase(restoreAgent.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default restoreAgentSlice.reducer;
