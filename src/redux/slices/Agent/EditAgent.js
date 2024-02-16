import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const editAgent = createAsyncThunk("editAgent", async (email) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/admin/createAgent`,
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

const editAgentSlice = createSlice({
  name: "editAgentSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(editAgent.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(editAgent.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(editAgent.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default editAgentSlice.reducer;
