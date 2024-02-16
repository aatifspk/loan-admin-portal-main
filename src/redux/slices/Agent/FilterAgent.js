import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const filterAgent = createAsyncThunk("filterAgent", async (keyWord) => {
  console.log(keyWord);
  try {
    const response = await axios.get(
      `http://localhost:8080/api/admin/getAgentList?keyword=${keyWord}`,
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

const filterAgentSlice = createSlice({
  name: "filterAgentSlice",
  initialState: {
    loading: false,
    agents: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(filterAgent.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(filterAgent.fulfilled, (state, action) => {
      state.loading = false;
      state.agents = action.payload;
    });
    builder.addCase(filterAgent.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default filterAgentSlice.reducer;
