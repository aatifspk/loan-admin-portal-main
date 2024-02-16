import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const viewClient = createAsyncThunk("viewClient", async (id) => {
  console.log(id, "id");
  try {
    const response = await axios.get(
      `http://localhost:8080/api/admin/getParticularClient/${id}`,
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

const viewClientSlice = createSlice({
  name: "viewClientSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(viewClient.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(viewClient.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
    });
    builder.addCase(viewClient.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default viewClientSlice.reducer;
