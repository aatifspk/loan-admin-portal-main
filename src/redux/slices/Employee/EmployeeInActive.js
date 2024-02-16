import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");

export const employeeInActive = createAsyncThunk(
  "employeeInActive",
  async ({ id, status }) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/admin/employeeInActive/${id}`,
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

const employeeInActiveSlice = createSlice({
  name: "employeeInActiveSlice",
  initialState: {
    loading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(employeeInActive.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(employeeInActive.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(employeeInActive.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default employeeInActiveSlice.reducer;
