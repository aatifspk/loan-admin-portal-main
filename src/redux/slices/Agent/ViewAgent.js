import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const viewAgent = createAsyncThunk("viewAgent", async (id) => {
  console.log(id, "id");
  try {
    const response = await axios.get(
      `http://localhost:8080/api/admin/getAgent/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log(response, "redux response");
    return response;
  } catch (error) {
    console.log(error, "redux error");
    throw error;
  }
});

const viewAgentSlice = createSlice({
  name: "viewAgentSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(viewAgent.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(viewAgent.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
    });
    builder.addCase(viewAgent.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default viewAgentSlice.reducer;
