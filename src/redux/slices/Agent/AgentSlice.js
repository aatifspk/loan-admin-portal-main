import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const authToken = localStorage.getItem("token");

export const agent = createAsyncThunk("agent", async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/admin/getAgentList`,
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
});
const agentSlice = createSlice({
  name: "agentSlice",
  initialState: {
    loading: false,
    agentList: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(agent.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(agent.fulfilled, (state, action) => {
      state.loading = false;
      state.agentList = action.payload;
    });
    builder.addCase(agent.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default agentSlice.reducer;
