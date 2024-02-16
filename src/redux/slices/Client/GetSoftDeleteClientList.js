import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const getSoftDeleteClinetsList = createAsyncThunk(
  "getSoftDeleteClinetsList",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/getSoftDeleteClinetsList`,
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
  }
);

const getSoftDeleteClinetsListSlice = createSlice({
  name: "getSoftDeleteAgentListSlice",
  initialState: {
    loading: false,
    deletedClientList: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getSoftDeleteClinetsList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSoftDeleteClinetsList.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedClientList = action.payload;
    });
    builder.addCase(getSoftDeleteClinetsList.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default getSoftDeleteClinetsListSlice.reducer;
