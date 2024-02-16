import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("token");
export const softDeleteEmployee = createAsyncThunk(
  "softDeleteEmployee",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/admin/deleteEmployee/${id}`,
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

const softDeleteEmployeeSlice = createSlice({
  name: "softDeleteEmployeeSlice",
  initialState: {
    loading: false,
    deletedEmployee: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(softDeleteEmployee.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(softDeleteEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedEmployee = action.payload;
    });
    builder.addCase(softDeleteEmployee.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default softDeleteEmployeeSlice.reducer;
