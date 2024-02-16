import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const permamentDelete = createAsyncThunk(
  "permamentDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/admin/permanentDeleteBranch/${id}`,
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

const permamentDeleteSlice = createSlice({
  name: "permamentDeleteSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(permamentDelete.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(permamentDelete.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(permamentDelete.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default permamentDeleteSlice.reducer;
